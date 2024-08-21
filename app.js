const express = require('express');
const app = express();
const path = require('path');

app.listen(8081, function() {
  console.log('Servidor rodando na porta 8081');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

function regraDeTres(valor1, valor2, valor3, valor4, tipo, incognita) {
  let resultado;
  if (tipo === 'direta') {
    if (incognita === 'valor4') {
      resultado = (valor2 * valor3) / valor1;
    } else if (incognita === 'valor1') {
      resultado = (valor2 * valor3) / valor4;
    } else if (incognita === 'valor2') {
      resultado = (valor1 * valor4) / valor3;
    } else if (incognita === 'valor3') {
      resultado = (valor1 * valor4) / valor2;
    }
  } else if (tipo === 'inversa') {
    if (incognita === 'valor4') {
      resultado = (valor1 * valor2) / valor3;
    } else if (incognita === 'valor1') {
      resultado = (valor4 * valor3) / valor2;
    } else if (incognita === 'valor2') {
      resultado = (valor4 * valor3) / valor1;
    } else if (incognita === 'valor3') {
      resultado = (valor1 * valor2) / valor4;
    }
  } else {
    throw new Error('Tipo de proporcionalidade inválido');
  }

  return resultado;
}

app.get('/calcular-regra-de-tres', function(req, res) {
  const valor1 = parseFloat(req.query.valor1) || null;
  const valor2 = parseFloat(req.query.valor2) || null;
  const valor3 = parseFloat(req.query.valor3) || null;
  const valor4 = parseFloat(req.query.valor4) || null;
  const tipo = req.query.tipo;
  const incognita = req.query.incognita;

  if ([valor1, valor2, valor3, valor4].filter(v => v !== null).length !== 3) {
    res.status(400).send('Deixe exatamente um valor em branco para ser a incógnita.');
    return;
  }

  try {
    const resultado = regraDeTres(valor1, valor2, valor3, valor4, tipo, incognita);
    res.send(`Expressão: (${valor1 || 'Incógnita'}/${valor3 || 'Incógnita'}) = (${valor2 || 'Incógnita'}/${valor4 || 'Incógnita'})<br>Resultado: ${resultado}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Maior Valor entre Cinco Números
function maiorValor(num1, num2, num3, num4, num5) {
  return Math.max(num1, num2, num3, num4, num5);
}

app.get('/calcular-maior-valor', function(req, res) {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const num3 = parseFloat(req.query.num3);
  const num4 = parseFloat(req.query.num4);
  const num5 = parseFloat(req.query.num5);

  if ([num1, num2, num3, num4, num5].some(isNaN)) {
    res.status(400).send('Todos os valores devem ser números válidos.');
    return;
  }

  const resultado = maiorValor(num1, num2, num3, num4, num5);
  res.send(`Maior Valor: ${resultado}`);
});

// Menor Valor entre Cinco Números
function menorValor(num1, num2, num3, num4, num5) {
  return Math.min(num1, num2, num3, num4, num5);
}

app.get('/calcular-menor-valor', function(req, res) {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const num3 = parseFloat(req.query.num3);
  const num4 = parseFloat(req.query.num4);
  const num5 = parseFloat(req.query.num5);

  if ([num1, num2, num3, num4, num5].some(isNaN)) {
    res.status(400).send('Todos os valores devem ser números válidos.');
    return;
  }

  const resultado = menorValor(num1, num2, num3, num4, num5);
  res.send(`Menor Valor: ${resultado}`);
});
