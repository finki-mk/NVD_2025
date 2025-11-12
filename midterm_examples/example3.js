
// approach 1 - for loop
// function sum_peaks(array){
//     let sum = 0;
//
//     for(let i = 0; i<array.length; i++){
//         if(i == 0){
//             if(array[i+1] < array[i]){
//                 sum += array[i];
//             }
//         }
//         else if(i == array.length-1){
//             if(array[i-1] < array[i]){
//                 sum += array[i]
//             }
//         }
//         else{
//             if(array[i-1] < array[i] && array[i+1] < array[i]){
//                 sum += array[i]
//             }
//         }
//     }
//     return sum
// }


// // approach 2
// function sum_peaks(array){
//     let sum = 0;
//
//     let result = array.filter((el, i, array) => {
//         if(i == 0){
//             if(array[i+1] < array[i]){
//                 return true
//             }
//         }
//         else if(i == array.length-1){
//             if(array[i-1] < array[i]){
//                 return true
//             }
//         }
//         else{
//             if(array[i-1] < array[i] && array[i+1] < array[i]){
//                 return true
//             }
//         }
//         return false
//     })

//     return result.reduce((acc, el) => acc+el, 0)
// }



function sum_peaks(array){

    return array.reduce((acc, el, i, array) => {
        let isPeak = false

        if(i == 0){
            if(array[i+1] < array[i]){
                isPeak = true
            }
        }
        else if(i == array.length-1){
            if(array[i-1] < array[i]){
                isPeak = true
            }
        }
        else{
            if(array[i-1] < array[i] && array[i+1] < array[i]){
                isPeak = true
            }
        }

        return acc + (isPeak ? el : 0)
    },0)

}