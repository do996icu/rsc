function getTGx(cos){
  let tgx = {'cos': 0, 'tg': 0, 'ctg': 0};
  if(!(parseFloat(cos) && parseFloat(cos) > 0)) return tgx;
  tgx.cos = cos;
  tgx.tg = Math.pow(Math.pow(cos, -2) -1 , 0.5).toFixed(4);
  tgx.ctg = Math.pow(tgx.tg, -1).toFixed(4);
  return tgx;
}
const g = Math.pow(3, 0.5);
function tg(c) {
  return parseFloat(getTGx(c).tg);
}
function ctg(c){
  return parseFloat(getTGx(c).ctg);
}
function isNull(c){
  return null;
}
const GX = [
  [
    {'ABC_IaIc_first_true_second_true': (c)=> 1},
    {'ABC_IaIc_first_true_second_false': (c)=> -1 * g * ctg(c)},
    {'ABC_IaIc_first_false_second_true': (c)=> g * ctg(c) },
    {'ABC_IaIc_first_false_second_false': (c)=> -1},

    {'ABC_IcIa_first_true_second_true': isNull},
    {'ABC_IcIa_first_true_second_false': (c)=> g * ctg(c)/2 },
    {'ABC_IcIa_first_false_second_true': (c)=> -1 * g * ctg(c)/2 },
    {'ABC_IcIa_first_false_second_false': isNull},

    {'BCA_IaIc_first_true_second_true': (c)=> -2/(1-g *tg(c))},
    {'BCA_IaIc_first_true_second_false': (c)=> 2 * g/(g + tg(c))},
    {'BCA_IaIc_first_false_second_true': (c)=> -2* g/(g + tg(c)) },
    {'BCA_IaIc_first_false_second_false': (c)=>2/(1 - g * tg(c))},

    {'BCA_IcIa_first_true_second_true': isNull},
    {'BCA_IcIa_first_true_second_false': (c)=>-g/(g + tg(c))},
    {'BCA_IcIa_first_false_second_true': (c)=> g/(g + tg(c)) },
    {'BCA_IcIa_first_false_second_false': isNull},

    {'CAB_IaIc_first_true_second_true': (c)=> -2/(1 + g * tg(c))},
    {'CAB_IaIc_first_true_second_false': (c)=> -2 * g/(g - tg(c))},
    {'CAB_IaIc_first_false_second_true': (c)=> 2* g/(g-tg(c)) },
    {'CAB_IaIc_first_false_second_false': (c)=>2/(1+ g * tg(c))},

    {'CAB_IcIa_first_true_second_true': isNull},
    {'CAB_IcIa_first_true_second_false': (c)=>g/(g-tg(c))},
    {'CAB_IcIa_first_false_second_true': (c)=> -1 * g/(g - tg(c)) },
    {'CAB_IcIa_first_false_second_false': isNull},

    {'ACB_IaIc_first_true_second_true': isNull},
    {'ACB_IaIc_first_true_second_false': (c)=> g/(g+tg(c))},
    {'ACB_IaIc_first_false_second_true': (c)=> -1 * g/(g+tg(c)) },
    {'ACB_IaIc_first_false_second_false': isNull},

    {'ACB_IcIa_first_true_second_true': (c)=> -2/(1 - g * tg(c))},
    {'ACB_IcIa_first_true_second_false': (c)=> -2 * g/(g+ tg(c))},
    {'ACB_IcIa_first_false_second_true': (c)=> g * 2/(g + tg(c))},
    {'ACB_IcIa_first_false_second_false': (c)=> 2/(1-g * tg(c))},

    {'BAC_IaIc_first_true_second_true': isNull},
    {'BAC_IaIc_first_true_second_false': (c)=> -1 * g/(g-tg(c))},
    {'BAC_IaIc_first_false_second_true': (c)=> g/(g-tg(c)) },
    {'BAC_IaIc_first_false_second_false': isNull},

    {'BAC_IcIa_first_true_second_true': (c)=>-2/(1 + g * tg(c))},
    {'BAC_IcIa_first_true_second_false': (c)=>2*g/(g-tg(c))},
    {'BAC_IcIa_first_false_second_true': (c)=> -2*g/(g-tg(c)) },
    {'BAC_IcIa_first_false_second_false': (c)=> 2/(1+g * tg(c))},


    {'CBA_IaIc_first_true_second_true': isNull},
    {'CBA_IaIc_first_true_second_false': (c)=> -1 * g * ctg(c)/2},
    {'CBA_IaIc_first_false_second_true': (c)=> g * ctg(c)/2 },
    {'CBA_IaIc_first_false_second_false': isNull},

    {'CBA_IcIa_first_true_second_true': (c)=>1},
    {'CBA_IcIa_first_true_second_false': (c)=> g * ctg(c)},
    {'CBA_IcIa_first_false_second_true': (c)=> -1 * g * ctg(c) },
    {'CBA_IcIa_first_false_second_false': (c)=> -1},
  ],
   [
    {'A' : (c)=> 2*g/(g+tg(c))},
    {'B' : (c)=> 2},
    {'C' : (c)=> 2*g/(g-tg(c))},
    {'AB' : isNull},
    {'BC': isNull},
    {'AC': isNull},
    {'ABC': isNull}
  ],
  [
    {'A': (c)=> 2*g/(g+tg(c))},
    {'C': (c)=> 2*g/(g-tg(c))},
    {'AC': isNull}
  ]
]

export default GX;
