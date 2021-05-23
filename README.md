# React Markov Algorithm Simulator

This project is meant to be an exercise of both frontend tecnhologies and concepts of theoretical computer science topics.


## What is a Markov Algorithm?

A Markov Algorithm is system to rewrite strings of symbols using rules to operate on these strings. They have been proven to be Turing Complete (i.e. they can do everything that Turing Machine can). Formally, each Markov Algorithm is defined as a 3-tuple (&Sigma;, P, P<sub>0</sub>), where &Sigma; is an alphabet of symbols, P is a set of productions given in some order, and P<sub>0</sub> is a subset of P which contains all final productions.


## What is this simulator?

This simulator is based on a different definition of algorithm, yet equivalent to the one of a Markov Algorithm. This definition is presented by Donald Knuth, on the book "The Art of Computer Programming - Volume 1". In this simulator, every rule is represented by 5 values: an index <b>j</b>; a string <b>&sigma;</b> to be replaced on the current state (if present); a string <b>&Phi;</b> to replace <b>&sigma;</b>; an instruction <b>a</b> to run next if <b>&sigma;</b> does not occur on the state; and an instruction <b>b</b>, to run next if <b>&sigma;</b> occurs on the state. The execution stops when reaches the instruction with the last index.


## Techonologies

The site is a Single Page Application (SPA), built with [ReactJS](https://reactjs.org/) and styled with [TailwindCSS](https://tailwindcss.com/).


## References
- [Yuanmi, C. H. E. N. "Markov Algorithm." Institut de Recherche en Informatique Fondamentale (2007): 1-7.](https://www.irif.fr/~carton/Enseignement/Complexite/ENS/Redaction/2007-2008/yuanmi.chen.pdf)
