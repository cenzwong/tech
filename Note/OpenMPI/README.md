# Getting Started in OpenMPI
## Must-know note
### Compilation
```bash
# C
## normal
gcc for_seq.c -o for_seq -g -Wall 
./for_seq
## MPI
mpicc -g -Wall -o mpi_hello mpi_hello.c
mpiexec -n 4 ./playground

# C++
## normal
g++ for_seq.cpp -o for_seq -std=c++11 -g -Wall 
./for_seq
## MPI
mpic++ -std=c++11 playground.cpp -o playground
mpiexec -n 4 ./playground
```

## Error Book
```
"unable to find network interfaces"
echo "alias mpiexec='mpiexec -mca btl_base_warn_component_unused 0'" >> ~/.bashrc
```
## Hello World case
- Cenz Framework
\
```c++
// mpic++ -std=c++11 playground.cpp -o playground
// mpiexec -n 4 ./playground

#include <mpi.h>     /* For MPI functions, etc */ 

int main(int argc, char **argv) {

   int        comm_sz;               /* Number of processes    */
   int        my_rank;               /* My process rank        */

   /* Start up MPI */
   MPI_Init(NULL, NULL);

   /* Get the number of processes */
   MPI_Comm_size(MPI_COMM_WORLD, &comm_sz); 

   /* Get my rank among all the processes */
   MPI_Comm_rank(MPI_COMM_WORLD, &my_rank); 

    //=============== I am side process ============
    // Get the data pieces from the array
    
    /* Send message to process 0 */
    // MPI_Send(&my_rank, 1, MPI_INT, 0, 0, MPI_COMM_WORLD); 
    // ------------- or ------------ 
    /* Create message */
    char       greeting[100];  /* String storing message */
    sprintf(greeting, "Greetings from process Master %d of %d!", 
        my_rank, comm_sz);
    /* Send message to process 0 */
    MPI_Send(greeting, strlen(greeting)+1, MPI_CHAR, 0, 0,
        MPI_COMM_WORLD); 

    //=============================================


    //=============== I am main process ============
    int intary_recv[comm_sz];
    int my_recv = 0;

    char       recv_greeting[100];  /* String storing message */

    if (my_rank == 0){
      // I am process zero, collect all the message
      for (int q = 0; q < comm_sz; q++) {
        //  /* Receive message from process q */
        //  MPI_Recv(&my_recv, 1, MPI_INT, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        //  /* Print message from process q */
        //  intary_recv[q] = my_recv;

        // std::cout << my_recv << std::endl;

        // ------------- or ------------ 

        /* Receive message from process q */
         MPI_Recv(recv_greeting, 100, MPI_CHAR, q,
            0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
         /* Print message from process q */
         printf("%s\n", recv_greeting);
      }

     
    }
    //=============================================

   /* Shut down MPI */
   MPI_Finalize(); 

    return 0;
}

```
- Sequencial Code printing data
```c++
// for_seq

// g++ for_seq.cpp -o for_seq -std=c++11 -g -Wall 
// ./for_seq

#include <iostream>

using namespace std;

int main(int argc, char **argv) {
    int data[5] = {10,2,3,4,5};
    cout << sizeof(data)/sizeof(*data) << endl;
    for (int i = 0; i < int(sizeof(data)/sizeof(*data)); i++){
        printf("%d: data is %d \n", i, data[i]);
    }

}
```
- Parallel Code printing data
```cpp
// mpic++ -std=c++11 for_parallel.cpp -o for_parallel
// mpiexec -n 4 ./for_parallel

#include <iostream>

#include <string.h>  /* For strlen             */
#include <mpi.h>     /* For MPI functions, etc */ 

using namespace std;

const int MAX_STRING = 100;

int main(int argc, char **argv) {

   char       greeting[MAX_STRING];  /* String storing message */
   int        comm_sz;               /* Number of processes    */
   int        my_rank;               /* My process rank        */
   
   int        my_send;
   int        my_recv;
   int ary_recv[4];

   int data[4] = {10,12,13,14};

   /* Start up MPI */
   MPI_Init(NULL, NULL);

   /* Get the number of processes */
   MPI_Comm_size(MPI_COMM_WORLD, &comm_sz); 

   /* Get my rank among all the processes */
   MPI_Comm_rank(MPI_COMM_WORLD, &my_rank); 


    // Get the data pieces from the array
    my_send = data[my_rank];
    /* Send message to process 0 */
    MPI_Send(&my_send, 1, MPI_INT, 0, 0, MPI_COMM_WORLD); 


    if (my_rank == 0){
      // I am process zero, collect all the message

      for (int q = 0; q < comm_sz; q++) {
         /* Receive message from process q */
         MPI_Recv(&my_recv, 1, MPI_INT, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
         /* Print message from process q */
         ary_recv[q] = my_recv;
      }     
      
      for (int i = 0; i < int(sizeof(ary_recv)/sizeof(*ary_recv)); i++){
            printf("%d: data is %d \n", i, ary_recv[i]);
        }

    }

   /* Shut down MPI */
   MPI_Finalize(); 

    return 0;
}
```

## Explaination
### MPI specify variable
#### MPI_Comm_size & MPI_Comm_rank
- [MPI_Comm_size](https://www.open-mpi.org/doc/current/man3/MPI_Comm_size.3.php)
- [MPI_Comm_rank](https://www.open-mpi.org/doc/current/man3/MPI_Comm_rank.3.php)
```c++
#include <mpi.h>
int MPI_Comm_size(MPI_Comm comm, int *size)
int MPI_Comm_rank(MPI_Comm comm, int *rank)

//============
int        mpi_comm_sz;               /* Number of processes    */
int        mpi_comm_rank;               /* Number of processes    */

/* Start up MPI */
MPI_Init(&argc, &argv);
/* Get the number of processes */
MPI_Comm_size(MPI_COMM_WORLD, &comm_sz); 
/* Get the number of processes */
MPI_Comm_size(MPI_COMM_WORLD, &comm_sz); 

// Your Parallel Code

/* Shut down MPI */
MPI_Finalize(); 
```
- Note: this is represent the number of process you are going to run
- ```mpiexec -n 4 ./playground``` mpi_comm_sz will be 4
- mpi_comm_rank is iterated from 0 to mpi_comm_sz

## MPI API
### MPI_Send & Recv
```c++
int MPI_Send(const void *buf, int count, MPI_Datatype datatype, int dest,
    int tag, MPI_Comm comm)

//
// sending string
MPI_Send(str_addr, strlen(str_addr)+1, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
MPI_Recv(recv_greeting, 100, MPI_CHAR, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);

MPI_Send(&my_rank, 1, MPI_INT, 0, 0, MPI_COMM_WORLD); 
MPI_Recv(&my_recv, 1, MPI_INT, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
```
### MPI_Datatype
| MPI_Datatype   | C datatype   |
| :------------- | :----------: |
|  MPI_CHAR |  signed char  |
| MPI_SHORT   | signed short int |
| MPI_INT | signed int |
| MPI_LONG | signed long int | 
| MPI_LONG_LONG | signed long long int |
| MPI_UNSIGNED_CHAR | unsigned char | 
| MPI_UNSIGNED_SHORT | unsigned short int |
| MPI_UNSIGNED | unsigned int | 
| MPI_UNSIGNED_LONG | unsigned long int |
| MPI_FLOAT | float | 
| MPI_DOUBLE | double | 
| MPI_LONG_DOUBLE | long double |
| MPI_BYTE |
| MPI_PACKED |

### MPI_Scatter & Gather
ref: https://mpitutorial.com/tutorials/mpi-scatter-gather-and-allgather/#:~:text=MPI_Scatter%20is%20a%20collective%20routine,all%20processes%20in%20a%20communicator.
!https://mpitutorial.com/tutorials/mpi-scatter-gather-and-allgather/broadcastvsscatter.png
```c++
int data[] = {11,22,33,44};
// if(my_rank == 0){
//     data = {11,22,33,44};
// }

int *recv_data ;
int element_to_exchange = 1;
recv_data = (int*)malloc(sizeof(int) * element_to_exchange); // you need to cast the data type
MPI_Scatter(data,       element_to_exchange, MPI_INT,
            recv_data, element_to_exchange, MPI_INT, 
            0, MPI_COMM_WORLD);

std::cout << my_rank << ":" << recv_data[0] << std::endl;

//mpiexec -n 4 ./scatter_test
// 0:11
// 2:33
// 3:44
// 1:22
```

