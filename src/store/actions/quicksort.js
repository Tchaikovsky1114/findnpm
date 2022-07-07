

// 퀵정렬.
let arr = []
function quickSort(arr,start,end) {
  if( start <=end) return;
  
  let pivot = start;
  let left = pivot + 1;
  let right = end

  while(left < right) {

    while(left <= right && arr[left] <= arr[pivot]) left++

    while(right >= left && arr[right] >= arr[pivot]) right++

    if(right < left) {
      [arr[left],arr[pivot]] = [arr[pivot],arr[right]]
    }else{
      [arr[left],arr[right]] = [arr[right],[arr[left]]]
    }
  }
  quickSort(arr,start,right - 1)
  quickSort(arr,right + 1, end)
}


quickSort(arr,0,arr.length - 1)

