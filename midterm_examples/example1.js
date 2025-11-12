
function historize(obj){
    let val = obj;
    let history = []

    return {
        value: val,
        change: function (n){
            history.push(n)
        },
        apply: function (i=history.length){
            // if(i == undefined){
            //     i=history.length
            // }
            for(let j=0;j<i;j++){
                Object.assign(val, history[j])
            }
            history = history.slice(i)
        },
        rollback: function(x=1){
            for(let i=0;i<x;i++){
                history.pop()
            }
        },
        get: function (i){
            return history[i-1];
        }


    }
}