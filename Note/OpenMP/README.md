# OpenMP (Multiprocessing)
- An API for shared-memory parallel programming

# Helloworld
```c
gcc −g −Wall −fopenmp −o omp_hello omp_hello . c
./omp_hello 4
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>   

void Hello(void);  /* Thread function */

/*--------------------------------------------------------------------*/
int main(int argc, char* argv[]) {
   int thread_count = strtol(argv[1], NULL, 10); 

#  pragma omp parallel num_threads(thread_count) 
   Hello();

   return 0; 
}  /* main */

/*-------------------------------------------------------------------
 * Function:    Hello
 * Purpose:     Thread function that prints message
 */
void Hello(void) {
   int my_rank = omp_get_thread_num();
   int thread_count = omp_get_num_threads();

   printf("Hello from thread %d of %d\n", my_rank, thread_count);

}  /* Hello */
```
# API
```c
#include <omp.h>
#pragma //add before the openMP funciton
```
```c
#pragma omp parallel num_threads(thread_count)

//inside omp function
int my_rank = omp_get_thread_num();
int thread_count = omp_get_num_threads();
```
- better 
```c
#ifdef _OPENMP
  #include <omp.h>
#endif

#ifdef _OPENMP
  int my_rank = omp_get_thread_num();
  int thread_count = omp_get_num_threads();
#else
  int my_rank = 0;
  int thread_count = 1;
#endif

```



