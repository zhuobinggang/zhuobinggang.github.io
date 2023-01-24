function hasNull(arr) {
  return arr.some(el => el == null);
}

// My results: [0.4523809523809524, 0.6333333333333333, 0.5277777777777778]
function cal_prec_rec_f1(results, targets){
    let TP = 0
    let FP = 0
    let FN = 0
    let TN = 0
    for (i = 0; i < results.length; i++) {
        let guess = results[i]
        let target = targets[i]
        if (guess == 1) {
            if (target == 1) {
                TP += 1
            } else if (target == 0) {
                FP += 1
            }
        } else if (guess == 0) {
            if (target == 1) {
                FN += 1
    
            } else if (target == 0) {
                TN += 1
            }
        }
    }
    let prec = 0
    if (TP + FP > 0) {
        prec = TP / (TP + FP)
    }
    let rec = 0
    if (TP + FN > 0) {
        rec = TP / (TP + FN)
    }
    let f1 = 0
    if (prec + rec != 0) {
        f1 = (2 * prec * rec) / (prec + rec)
    }
    return [prec, rec, f1]
}


datas = datas.map(data => {
        ss = data[0]
        console.log(ss)
        labels = data[1]
        console.log(labels)
        return {
                text: ss.slice(0, 2).join('') + '🔪' + ss.slice(2).join(''),
                picked: null,
                result: labels[2]
        }
})

targets = datas.map(item => item['result'])

var app = new Vue({
    el: '#app',
    data: {
            datas: datas,
            pickeds: [],
            scores: null,
    },
    methods: {
            submit: function(e){
                    pickeds = datas.map(data => {
                            return data['picked']
                    })
                    console.log(pickeds)
                    this.pickeds = pickeds
                    if (hasNull(this.pickeds)){
                            alert('まだ完成していない')
                    }else{
                            results = pickeds
                            let [prec, rec, f1] = cal_prec_rec_f1(results, targets)
                            this.scores = `得点, prec: ${prec}, rec: ${rec}, f1: ${f1}`
                            alert(this.scores)
                    }
            },
    },
})
