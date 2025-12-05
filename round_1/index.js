const express = require('express');
const app = express();
const port = 8080;

let display = '0';
let firstNum = '';
let operator = '';
let waitingForSecondNum = false;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head><title>🔢</title>
<style>
body{font-family:sans-serif;background:#f0f0f0;display:grid;place-items:center;height:100vh;margin:0}
.calc{background:#333;border-radius:20px;padding:25px;box-shadow:0 10px 30px rgba(0,0,0,0.3)}
.display{background:#222;color:#fff;font-size:3.5em;padding:25px;border-radius:15px;margin-bottom:25px;text-align:right;min-height:90px;box-shadow:inset 0 5px 10px rgba(0,0,0,0.3)}
.btn{background:#555;color:#fff;border:none;border-radius:18px;font-size:2.2em;width:85px;height:85px;margin:12px;cursor:pointer;box-shadow:0 5px 15px rgba(0,0,0,0.2);transition:all 0.1s}
.btn:hover{background:#666;transform:translateY(-2px)}
.btn:active{transform:translateY(0);box-shadow:0 2px 5px rgba(0,0,0,0.2)}
.btn.num{font-size:2.2em}
.btn.zero{width:178px}
.btn.full{width:100%;margin-top:15px;font-size:2.5em;height:70px}
.btn.op{font-size:2.5em;background:#ff9500}
.btn.op:hover{background:#ff7b00}
.btn.clear{background:#ff3b30;font-size:2.5em}
.btn.equal{background:#34c759;font-size:2.8em;height:95px}
</style></head>
<body>
<div class="calc">
<div class="display" id="display">0</div>
<div>
<button class="btn num" onclick="append('7')">7️⃣</button>
<button class="btn num" onclick="append('8')">8️⃣</button>
<button class="btn num" onclick="append('9')">9️⃣</button>
<button class="btn op" onclick="operation('/')">➗</button>
</div>
<div>
<button class="btn num" onclick="append('4')">4️⃣</button>
<button class="btn num" onclick="append('5')">5️⃣</button>
<button class="btn num" onclick="append('6')">6️⃣</button>
<button class="btn op" onclick="operation('*')">✖️</button>
</div>
<div>
<button class="btn num" onclick="append('1')">1️⃣</button>
<button class="btn num" onclick="append('2')">2️⃣</button>
<button class="btn num" onclick="append('3')">3️⃣</button>
<button class="btn op" onclick="operation('-')">➖</button>
</div>
<div>
<button class="btn num zero" onclick="append('0')">0️⃣</button>
<button class="btn" onclick="append('.')">.</button>
<button class="btn equal" onclick="calculate()">✅</button>
<button class="btn op" onclick="operation('+')">➕</button>
</div>
<button class="btn clear full" onclick="clearAll()">🔄</button>

</div>
<script>
let display = document.getElementById('display');
function append(num) {
  if (display.innerHTML === '0' && num !== '.') display.innerHTML = num;
  else display.innerHTML += num;
}
function operation(op) {
  fetch('/calc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({type: 'op', value: op, display: display.innerHTML})
  });
  display.innerHTML = '0';
}
function calculate() {
  fetch('/calc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({type: 'eq', display: display.innerHTML})
  }).then(r=>r.json()).then(data=>display.innerHTML=data.result);
}
function clearAll() {
  fetch('/calc', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({type: 'clear'})});
  display.innerHTML = '0';
}
</script>
</body>
</html>
  `);
});

app.post('/calc', express.json(), (req, res) => {
  const { type, value, display: input } = req.body;
  
  if (type === 'clear') {
    display = '0';
    firstNum = '';
    operator = '';
    waitingForSecondNum = false;
  } else if (type === 'op') {
    firstNum = input || display;
    operator = value;
    waitingForSecondNum = true;
  } else if (type === 'eq') {
    let secondNum = input;
    let result;
    if (waitingForSecondNum && firstNum && operator) {
      const n1 = parseFloat(firstNum);
      const n2 = parseFloat(secondNum);
      switch(operator) {
        case '+': result = n1 + n2; break;
        case '-': result = n1 - n2; break;
        case '*': result = n1 * n2; break;
        case '/': result = n2 ? n1 / n2 : '❌'; break;
      }
      display = result.toString();
      firstNum = result.toString();
      operator = '';
      waitingForSecondNum = false;
    } else {
      display = input;
    }
  }
  res.json({result: display});
});

app.listen(port, () => {
  console.log(`🔢 🚀 http://localhost:${port}`);
});
