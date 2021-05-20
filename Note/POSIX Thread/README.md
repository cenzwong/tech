# POSIX Threads

```c++
gcc -g -Wall -o pth_hello pth_hello.c -lpthread
./pth_hello 3

// use -pthread instead of -lpthread(old)

```
```C++
// gcc -g -Wall -o pth_hello pth_hello.c -lpthread; ./pth_hello 3
// g++ -lstdc++ -std=c++11 -pthread pthread_helloworld.cpp -o pthread; ./pthread 3

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h> 

/* Global variable:  accessible to all threads */
int thread_count;

void *Hello(void* rank);  /* Thread function */

/*--------------------------------------------------------------------*/
int main(int argc, char* argv[]) {
   long       thread;  /* Use long in case of a 64-bit system */
   pthread_t* thread_handles; 

   thread_count = strtol(argv[1], NULL, 10);

   thread_handles = (pthread_t*)malloc(thread_count*sizeof(pthread_t)); // allocate the size of the thread

   for (thread = 0; thread < thread_count; thread++){
       pthread_create(&thread_handles[thread], NULL,
          Hello, (void*) thread);  
   }

   printf("Hello from the main thread\n");

   for (thread = 0; thread < thread_count; thread++){
       pthread_join(thread_handles[thread], NULL); 
   }

   free(thread_handles);
   return 0;
}  /* main */

/*-------------------------------------------------------------------*/
void *Hello(void* rank) {
   long my_rank = (long) rank;  /* Use long in case of 64-bit system */ 

   printf("Hello from thread %ld of %d\n", my_rank, thread_count);

   return NULL;
}  /* Hello */

```

# Notes
```c
int pthread_create(
   pthread_t*  thread_p                   /* out */, 
   const       pthread_attr_t* attr_p     /* in */,
   void*       (*start_routine)(void*)    /* in */, 
   void*       arg_p                      /* in */
);
```
## Mutex (Mutual exclusion)
```c
int pthread_mutex_init(
   pthread_mutex_t*              mutex_p     /* out */,
   const pthread_mutexattr_t*    attr_p      /* in */
);
int pthread_mutex_lock(pthread_mutex_t* mutex_p /* in/out */);
int pthread_mutex_unlock(pthread_mutex_t* mutex_p /* in/out */);
int pthread_mutex_destroy(pthread_mutex_t* mutex_p /* in/out */);
```
## Semaphore
```c
#include <semaphore.h>

int sem_init(sem_t* semaphore_p /* out */, int shared /* in */, unsigned initial_val /* in */);
int sem_destroy(sem_t* semaphore_p /* in/out */);
int sem_post(sem_t* semaphore_p /* in/out */);
int sem_wait(sem_t* semaphore_p /* in/out */);
```
