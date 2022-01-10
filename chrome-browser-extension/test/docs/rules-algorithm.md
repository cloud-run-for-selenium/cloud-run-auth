 //algorithm:
            // check the regex. If >= 112, pop one rev out of the origArray and put in a recheckArray
            // keep popping out of the regex and putting into recheckArray until regex < 112.
            // put regex in an outputArr and repeat the process with the recheckArray recursively
            // stop when recheckArray is empty and there is no need to pop anymore. 


a,b,c,d,e,f,g,h,i,j,k,l,m,n

a = a,b,c,d,e,f,g,h,i,j,k,l,m,n
b = 

a = a,b,c,d,e,f,g,h,i,j,k,l,m
b = n

a = a,b,c,d,e,f,g,h,i,j,k,l
b = n,m

a = a,b,c,d,e,f,g,h,i,j,k
b = n,m,l

a = a,b,c,d,e,f,g,h,i,j
b = n,m,l,k

a = a,b,c,d,e,f,g,h,i
b = n,m,l,k,j

a = a,b,c,d,e,f,g,h
b = n,m,l,k,j,i

a = a,b,c,d,e,f,g
b = n,m,l,k,j,i,h

a = a,b,c,d,e,f
b = n,m,l,k,j,i,h,g

a = a,b,c,d,e
b = n,m,l,k,j,i,h,g,f

a = a,b,c,d
b = n,m,l,k,j,i,h,g,f,e

return a and make b be and

a = n,m,l,k,j,i,h,g,f,e
b =

a = n,m,l,k,j,i,h,g,f
b = e

a = n,m,l,k,j,i,h,g
b = e,f

a = n,m,l,k,j,i,h
b = e,f,g

a = n,m,l,k,j,i
b = e,f,g,h

a = n,m,l,k,j
b = e,f,g,h,i

a = n,m,l,k
b = e,f,g,h,i,j

return a and make b be a

a = e,f,g,h,i,j
b =

a = e,f,g,h,i
b = j

a = e,f,g,h
b = j,i

return a and make b be a

a = j,i
b

return a and since b is empty we are done.

