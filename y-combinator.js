//version1, normal way of recursion
var v1_fact = function fact(n) {
  if(n < 2) return 1;
  return n * fact(n-1);
};
console.log("this is the normal version of the fact")
console.log(v1_fact(5));

//version2, somehow pass itself in 
//this is the version that ugly because of how it being called 
var v2_fact = function (f, n) {
  if(n < 2) return 1;
  return n * f(f, n -1);
};
console.log("This is the version2 of fact");
console.log(v2_fact(v2_fact, 5));

// What we need is just some refactor 
// in the verion2 we can see in calling place we did two things, generate fact and call it on 5
// now how about we just generate it
//split resposbility make this version as an nested function of the version2
var v3_fact = function (f) {
  return function (n) {
    if(n < 2) return 1;
    return n * f(f)(n - 1);
  };
};
console.log("This is the version3 of fact");
var fact = v3_fact(v3_fact);
console.log(fact(5));

//set up another nested function as helper method
var v4_fact = function (f) {
  var g = function (n) {
    return f(f)(n);
  };
  return function (n) {
    if(n < 2) return 1;
    return n * g(n - 1);
  };
};
console.log("This is the version4 of fact");
var fact = v4_fact(v4_fact);
console.log(fact(5));

//set up more helper method
//pass v4_fact to the recur function as well
var recur = function (f) {
  return f(f);
};

var fact = recur(function(f) {
  var g = function (n) {
    return f(f)(n);
  };
  return function (n) {
    if(n < 2) return 1;
    return n * g(n - 1);
  };
});

console.log("This is the 5 version of the fact function");
console.log(fact(5));

//elimiting the local function g, makes g as paramter
//something like inline g
var fact = recur(function(f) {
  return (function (it_self) {
    return function (n) {
      if(n < 2) return 1;
      return n * it_self(n - 1)
    }
  })(function (n) {
    return f(f)(n);
  });
});

console.log("this is the 6 version of the fact function");
console.log(fact(5));

//extract the fake recursion
//and using it call another function
var fake_fact = function (fact_self) {
  return function (n) {
    if (n < 2) return 1;
    return n * fact_self(n - 1);
  }
};

var fact = recur(function (f) {
  return fake_fact(function (n) {
    return f(f)(n);
  });
});

console.log("this is the version 7 of the fact function");
console.log(fact(5));

//inline recur function itself
var fact = (function(g) {
  return g(g);
})(function (f) {
  return fake_fact(function (n) {
    return f(f)(n);
  });
});

console.log("this is the version 8 of the fact function");
console.log(fact(5));

//define Y combinator
var Y = function (fake_recur) {
  return (function (f) {
    return f(f);   
  })(function (f) {
    return fake_recur(function (n) {
      return f(f)(n);
    });
  });
};

var result = Y(function (it_self) {
  return function (n) {
    if(n < 2) return 1;
    return n * it_self(n - 1);
  }
})(5);

var f_result = Y(function (it_self) {
  return function(n) {
    if(n === 0) return 0;
    if(n === 1) return 1;
    return it_self(n - 1) + it_self(n - 2);
  }
})(10);

console.log("Y combinator")
console.log("result of the fact" + result);
console.log("result of the f_result" + f_result);

//lead to fixed point
console.log("this is lead to fixed point")
real_fact = Y(fake_fact);
real_fact1 = fake_fact(real_fact);
real_fact2 = fake_fact(Y(fake_fact));
real_fact3 = fake_fact(fake_fact(fake_fact(fake_fact(fake_fact(fake_fact(real_fact))))));
console.log(real_fact);
console.log(real_fact1);
console.log(real_fact2);
console.log(real_fact3);
//so you can see fake_fact(real_fact) = real_fact, that is the fixed point
//Y combinator defination
//Let Y = Lambad fake_recur.
//lef f_gen = lambad self.fake_recur(self(self));
//return f_gen(f_gen);
