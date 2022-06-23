export function isEmpty(val)
{
    return val.trim().length === 0;
}

export function emailCheck(val){

    if(val.trim().length != 0){
      if( ! val.trim().includes('@')  ){
         return true ;
        }
    }

    // const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    // return regex.test(val);
  
}