import os

login = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>HabitPulz Login</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07070b;--sur:rgba(22,22,42,.55);--sur2:rgba(30,30,53,.75);--bor:rgba(124,106,247,.25);--txt:#f0f0f5;--mut:#8a8ab0;--ac:#7c6af7;--ac2:#f76a8a;--grn:#4ade80}
body{font-family:Inter,sans-serif;background:radial-gradient(circle at top right,#16162a 0%,var(--bg) 70%);background-attachment:fixed;color:var(--txt);min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.blob{position:fixed;border-radius:50%;filter:blur(80px);opacity:.15;animation:fl 8s ease-in-out infinite;pointer-events:none}
.b1{width:400px;height:400px;background:var(--ac);top:-100px;left:-100px}
.b2{width:300px;height:300px;background:var(--ac2);bottom:-80px;right:-80px;animation-delay:3s}
.b3{width:200px;height:200px;background:var(--grn);top:50%;left:50%;animation-delay:5s}
@keyframes fl{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-30px) scale(1.05)}}
.wrap{display:flex;width:900px;max-width:95vw;min-height:560px;background:var(--sur);border:1px solid var(--bor);border-radius:24px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.5);position:relative;z-index:1}
.left{flex:1;background:linear-gradient(135deg,#1a1535,#0f0f1a);padding:48px 40px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.left::before{content:'';position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(124,106,247,.2),transparent);top:-50px;left:-50px;border-radius:50%}
.brand{display:flex;align-items:center;gap:12px}
.brand-icon{width:46px;height:46px;background:linear-gradient(135deg,#facc15,#f59e0b);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#111;box-shadow:0 0 20px rgba(250,204,21,.5);animation:tp 2s infinite ease-in-out}
@keyframes tp{0%,100%{box-shadow:0 0 15px rgba(250,204,21,.5);transform:scale(1)}50%{box-shadow:0 0 35px rgba(250,204,21,.5),0 0 50px rgba(250,204,21,.3);transform:scale(1.05)}}
.brand-name{font-size:24px;font-weight:800;letter-spacing:1px;background:linear-gradient(90deg,#fff 0%,#facc15 50%,#7c6af7 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 4s linear infinite}
@keyframes sh{to{background-position:200% center}}
.lc{position:relative;z-index:1}
.lc h2{font-size:28px;font-weight:800;line-height:1.3;margin-bottom:16px}
.lc p{font-size:14px;color:var(--mut);line-height:1.7}
.pills{display:flex;flex-direction:column;gap:12px;margin-top:24px}
.pill{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid var(--bor);border-radius:12px;padding:12px 16px;font-size:13px}
.lfoot{font-size:12px;color:var(--mut)}
.right{width:420px;padding:48px 40px;display:flex;flex-direction:column;justify-content:center}
.tabs{display:flex;background:var(--sur2);border-radius:12px;padding:4px;margin-bottom:32px}
.tab{flex:1;padding:10px;border:none;background:transparent;color:var(--mut);font-size:13px;font-weight:600;border-radius:10px;cursor:pointer;transition:all .2s;font-family:Inter,sans-serif}
.tab.active{background:var(--ac);color:#fff}
.ftitle{font-size:22px;font-weight:700;margin-bottom:6px}
.fsub{font-size:13px;color:var(--mut);margin-bottom:28px}
.fg{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.fg label{font-size:12px;font-weight:600;color:var(--mut);text-transform:uppercase;letter-spacing:.5px}
.iw{position:relative}
.iw i{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--mut);font-size:14px}
.fi{width:100%;background:var(--sur2);border:1px solid var(--bor);color:var(--txt);padding:12px 14px 12px 40px;border-radius:10px;font-size:14px;font-family:Inter,sans-serif;transition:border-color .2s}
.fi:focus{outline:none;border-color:var(--ac)}
.eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--mut);cursor:pointer;font-size:14px}
.rrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;font-size:13px}
.rrow label{display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--mut)}
.rrow a{color:var(--ac);text-decoration:none}
.btnl{width:100%;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border:none;padding:13px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:opacity .2s,transform .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.btnl:hover{opacity:.9;transform:translateY(-1px)}
.divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:var(--mut);font-size:12px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--bor)}
.demos{display:flex;flex-direction:column;gap:8px}
.demo{display:flex;align-items:center;gap:10px;background:var(--sur2);border:1px solid var(--bor);color:var(--txt);padding:10px 14px;border-radius:10px;font-size:13px;cursor:pointer;font-family:Inter,sans-serif;transition:border-color .2s;text-align:left;width:100%}
.demo:hover{border-color:var(--ac)}
.dbadge{margin-left:auto;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700}
.ba{background:rgba(247,106,138,.15);color:var(--ac2)}
.bu{background:rgba(124,106,247,.15);color:var(--ac)}
.err{background:rgba(247,106,138,.1);border:1px solid rgba(247,106,138,.3);color:var(--ac2);padding:10px 14px;border-radius:10px;font-size:13px;margin-bottom:16px;display:none}
#sf{display:none}
@media(max-width:700px){.left{display:none}.right{width:100%}}
</style>
</head>
<body>
<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
<div class="wrap">
  <div class="left">
    <div class="brand">
      <div class="brand-icon"><i class="fa-solid fa-bolt"></i></div>
      <span class="brand-name">HabitPulz</span>
    </div>
    <div class="lc">
      <h2>Build habits that<br/>actually stick.</h2>
      <p>Track study sessions, lifestyle goals, and daily routines all in one place.</p>
      <div class="pills">
        <div class="pill">&#128218; Smart study habit tracking</div>
        <div class="pill">&#128293; Streak and XP reward system</div>
        <div class="pill">&#129302; AI habit coach chatbot</div>
        <div class="pill">&#128202; Progress analytics dashboard</div>
      </div>
    </div>
    <div class="lfoot">&#169; 2026 HabitPulz</div>
  </div>
  <div class="right">
    <div class="tabs">
      <button class="tab active" id="tl">Sign In</button>
      <button class="tab" id="ts">Sign Up</button>
    </div>
    <div id="lf">
      <div class="ftitle">Welcome back &#128075;</div>
      <div class="fsub">Sign in to continue your streak</div>
      <div class="err" id="lerr">Invalid email or password.</div>
      <div class="fg"><label>Email</label><div class="iw"><i class="fa-solid fa-envelope"></i><input type="email" class="fi" id="lemail" placeholder="you@example.com"/></div></div>
      <div class="fg"><label>Password</label><div class="iw"><i class="fa-solid fa-lock"></i><input type="password" class="fi" id="lpass" placeholder="Password"/><button class="eye" id="eyebtn"><i class="fa-solid fa-eye"></i></button></div></div>
      <div class="rrow"><label><input type="checkbox"/> Remember me</label><a href="#">Forgot password?</a></div>
      <button class="btnl" id="dobtn"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In</button>
      <div class="divider">or try a demo account</div>
      <div class="demos">
        <button class="demo" id="d1"><i class="fa-solid fa-shield-halved"></i><div><div style="font-weight:600">Admin Account</div><div style="font-size:11px;opacity:.7">admin@HabitPulz.com</div></div><span class="dbadge ba">Admin</span></button>
        <button class="demo" id="d2"><i class="fa-solid fa-user"></i><div><div style="font-weight:600">Alex (User)</div><div style="font-size:11px;opacity:.7">alex@HabitPulz.com</div></div><span class="dbadge bu">User</span></button>
      </div>
    </div>
    <div id="sf">
      <div class="ftitle">Create account &#10024;</div>
      <div class="fsub">Start your habit journey today</div>
      <div class="err" id="serr">Please fill all fields correctly.</div>
      <div class="fg"><label>Full Name</label><div class="iw"><i class="fa-solid fa-user"></i><input type="text" class="fi" id="sname" placeholder="Your name"/></div></div>
      <div class="fg"><label>Email</label><div class="iw"><i class="fa-solid fa-envelope"></i><input type="email" class="fi" id="semail" placeholder="you@example.com"/></div></div>
      <div class="fg"><label>Password</label><div class="iw"><i class="fa-solid fa-lock"></i><input type="password" class="fi" id="spass" placeholder="Min 6 characters"/></div></div>
      <button class="btnl" id="sobtn" style="margin-top:8px"><i class="fa-solid fa-user-plus"></i> Create Account</button>
    </div>
  </div>
</div>
<script>
var U=[{name:"Admin",email:"admin@HabitPulz.com",password:"admin123",role:"admin"},{name:"Alex",email:"alex@HabitPulz.com",password:"user123",role:"user"}];
document.getElementById("d1").onclick=function(){document.getElementById("lemail").value="admin@HabitPulz.com";document.getElementById("lpass").value="admin123";};
document.getElementById("d2").onclick=function(){document.getElementById("lemail").value="alex@HabitPulz.com";document.getElementById("lpass").value="user123";};
document.getElementById("tl").onclick=function(){document.getElementById("tl").classList.add("active");document.getElementById("ts").classList.remove("active");document.getElementById("lf").style.display="block";document.getElementById("sf").style.display="none";};
document.getElementById("ts").onclick=function(){document.getElementById("ts").classList.add("active");document.getElementById("tl").classList.remove("active");document.getElementById("sf").style.display="block";document.getElementById("lf").style.display="none";};
document.getElementById("eyebtn").onclick=function(){var i=document.getElementById("lpass");var ic=document.querySelector("#eyebtn i");i.type=i.type==="password"?"text":"password";ic.className=i.type==="password"?"fa-solid fa-eye":"fa-solid fa-eye-slash";};
document.getElementById("dobtn").onclick=function(){var e=document.getElementById("lemail").value.trim();var p=document.getElementById("lpass").value;var u=U.find(function(x){return x.email===e&&x.password===p;});if(!u){document.getElementById("lerr").style.display="block";return;}document.getElementById("lerr").style.display="none";localStorage.setItem("hp_user",JSON.stringify(u));window.location.href=u.role==="admin"?"admin.html":"index.html";};
document.getElementById("sobtn").onclick=function(){var n=document.getElementById("sname").value.trim();var e=document.getElementById("semail").value.trim();var p=document.getElementById("spass").value;if(!n||!e||p.length<6){document.getElementById("serr").style.display="block";return;}document.getElementById("serr").style.display="none";var u={name:n,email:e,password:p,role:"user"};localStorage.setItem("hp_user",JSON.stringify(u));window.location.href="index.html";};
document.addEventListener("keydown",function(e){if(e.key==="Enter")document.getElementById("dobtn").click();});
</script>
</body>
</html>"""

with open("login.html", "w", encoding="utf-8") as f:
    f.write(login)
print("login.html:", len(login.splitlines()), "lines")

admin = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>HabitPulz Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07070b;--sur:rgba(22,22,42,0.55);--sur2:rgba(30,30,53,0.75);--bor:rgba(124,106,247,0.25);--txt:#f0f0f5;--mut:#8a8ab0;--ac:#7c6af7;--ac2:#f76a8a;--grn:#4ade80;--blu:#60a5fa;--org:#fb923c;--th:#facc15}
body{font-family:Inter,sans-serif;background:radial-gradient(circle at top right,#16162a 0%,var(--bg) 70%);background-attachment:fixed;color:var(--txt);display:flex;min-height:100vh}
.sidebar{width:240px;min-height:100vh;background:var(--sur);border-right:1px solid var(--bor);display:flex;flex-direction:column;padding:24px 16px;position:fixed;top:0;left:0;z-index:100;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.logo{display:flex;align-items:center;gap:12px;margin-bottom:8px;padding:0 8px}
.logo-icon{width:46px;height:46px;background:linear-gradient(135deg,#facc15,#f59e0b);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#111;box-shadow:0 0 20px rgba(250,204,21,.5);animation:tp 2s infinite ease-in-out}
@keyframes tp{0%,100%{box-shadow:0 0 15px rgba(250,204,21,.5);transform:scale(1)}50%{box-shadow:0 0 35px rgba(250,204,21,.5),0 0 50px rgba(250,204,21,.3);transform:scale(1.05)}}
.logo-text{font-size:24px;font-weight:800;letter-spacing:1px;background:linear-gradient(90deg,#fff 0%,#facc15 50%,#7c6af7 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 4s linear infinite}
@keyframes sh{to{background-position:200% center}}
.abadge{margin:0 8px 24px;padding:6px 12px;background:rgba(247,106,138,.1);border:1px solid rgba(247,106,138,.3);border-radius:8px;font-size:11px;font-weight:700;color:var(--ac2);text-align:center;letter-spacing:1px}
.nav{display:flex;flex-direction:column;gap:4px;flex:1}
.ni{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;color:var(--mut);font-size:14px;font-weight:500;transition:all .2s;cursor:pointer;border:1px solid transparent}
.ni:hover{background:var(--sur2);color:var(--txt)}
.ni.active{background:linear-gradient(135deg,rgba(247,106,138,.2),rgba(124,106,247,.1));color:var(--ac2);border-color:rgba(247,106,138,.3)}
.ni i{width:18px;text-align:center}
.sfoot{display:flex;align-items:center;gap:12px;padding:16px;background:var(--sur2);border-radius:10px}
.av{width:36px;height:36px;background:linear-gradient(135deg,var(--ac2),var(--ac));border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px}
.main{margin-left:240px;flex:1;padding:32px}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}
.ptitle{font-size:26px;font-weight:700}
.psub{font-size:13px;color:var(--mut);margin-top:4px}
.btn-out{background:rgba(247,106,138,.1);border:1px solid rgba(247,106,138,.3);color:var(--ac2);padding:10px 20px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s}
.btn-out:hover{background:rgba(247,106,138,.2)}
.sec{display:none}.sec.active{display:block}
.sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
.sc{background:var(--sur);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--bor);border-radius:16px;padding:20px;display:flex;align-items:center;gap:16px;transition:transform .2s;box-shadow:0 8px 32px rgba(0,0,0,.4)}
.sc:hover{transform:translateY(-2px)}
.si{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}
.s1 .si{background:rgba(124,106,247,.15);color:var(--ac)}
.s2 .si{background:rgba(74,222,128,.15);color:var(--grn)}
.s3 .si{background:rgba(251,146,60,.15);color:var(--org)}
.s4 .si{background:rgba(247,106,138,.15);color:var(--ac2)}
.sv{font-size:28px;font-weight:800;display:block}
.sl{font-size:12px;color:var(--mut)}
.card{background:var(--sur);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--bor);border-radius:16px;padding:24px;margin-bottom:24px;box-shadow:0 8px 32px rgba(0,0,0,.4)}
.ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.ch h3{font-size:16px;font-weight:700}
.sinput{background:var(--sur2);border:1px solid var(--bor);color:var(--txt);padding:8px 14px;border-radius:8px;font-size:13px;font-family:Inter,sans-serif;width:220px}
.sinput:focus{outline:none;border-color:var(--ac)}
table{width:100%;border-collapse:collapse}
th{text-align:left;font-size:11px;font-weight:700;color:var(--mut);text-transform:uppercase;letter-spacing:.5px;padding:0 16px 12px}
td{padding:14px 16px;font-size:14px;border-top:1px solid var(--bor)}
tr:hover td{background:var(--sur2)}
.badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700}
.ba{background:rgba(247,106,138,.15);color:var(--ac2)}
.bu{background:rgba(124,106,247,.15);color:var(--ac)}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px}
.don{background:var(--grn)}.doff{background:var(--mut)}
.ab{background:none;border:none;cursor:pointer;font-size:14px;padding:4px 8px;border-radius:6px;transition:all .2s}
.ae{color:var(--blu)}.ad{color:var(--ac2)}
.ab:hover{background:var(--sur2)}
.ai{display:flex;align-items:center;gap:14px;font-size:13px;padding:14px 0;border-bottom:1px solid var(--bor)}
.aico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.at{margin-left:auto;color:var(--mut);font-size:12px;white-space:nowrap}
.cgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.bchart{display:flex;align-items:flex-end;gap:8px;height:100px;margin-top:16px}
.bw{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1}
.bar{width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--ac),var(--ac2));min-height:4px}
.blab{font-size:10px;color:var(--mut)}
.stgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sti{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--bor)}
.tog{width:44px;height:24px;background:var(--sur2);border-radius:12px;position:relative;cursor:pointer;border:1px solid var(--bor);transition:background .2s}
.tog.on{background:var(--ac);border-color:var(--ac)}
.tog::after{content:'';position:absolute;width:18px;height:18px;background:#fff;border-radius:50%;top:2px;left:2px;transition:transform .2s}
.tog.on::after{transform:translateX(20px)}
.sh2{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.sh2 h2{font-size:18px;font-weight:700;display:flex;align-items:center;gap:10px}
</style>
</head>
<body>
<aside class="sidebar">
  <div class="logo">
    <div class="logo-icon"><i class="fa-solid fa-bolt"></i></div>
    <span class="logo-text">HabitPulz</span>
  </div>
  <div class="abadge">&#9889; ADMIN PANEL</div>
  <nav class="nav">
    <div class="ni active" data-s="overview"><i class="fa-solid fa-gauge-high"></i><span>Overview</span></div>
    <div class="ni" data-s="users"><i class="fa-solid fa-users"></i><span>Users</span></div>
    <div class="ni" data-s="habits"><i class="fa-solid fa-list-check"></i><span>All Habits</span></div>
    <div class="ni" data-s="activity"><i class="fa-solid fa-clock-rotate-left"></i><span>Activity Log</span></div>
    <div class="ni" data-s="analytics"><i class="fa-solid fa-chart-bar"></i><span>Analytics</span></div>
    <div class="ni" data-s="chatbot"><i class="fa-solid fa-robot"></i><span>AI Coach</span></div>
    <div class="ni" data-s="settings"><i class="fa-solid fa-gear"></i><span>Settings</span></div>
  </nav>
  <div class="sfoot">
    <div class="av" id="av">A</div>
    <div>
      <span style="font-size:13px;font-weight:600;display:block" id="aname">Admin</span>
      <span style="font-size:11px;color:var(--ac2)">Administrator</span>
    </div>
  </div>
</aside>
<main class="main">
  <header class="topbar">
    <div><h1 class="ptitle" id="gtitle">Admin Dashboard</h1><p class="psub">Manage users, habits, and platform settings</p></div>
    <button class="btn-out" id="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
  </header>
  <section class="sec active" id="overview">
    <div class="sgrid">
      <div class="sc s1"><div class="si"><i class="fa-solid fa-users"></i></div><div><span class="sv">128</span><span class="sl">Total Users</span></div></div>
      <div class="sc s2"><div class="si"><i class="fa-solid fa-fire"></i></div><div><span class="sv">1,842</span><span class="sl">Active Habits</span></div></div>
      <div class="sc s3"><div class="si"><i class="fa-solid fa-check-double"></i></div><div><span class="sv">94%</span><span class="sl">Completion Rate</span></div></div>
      <div class="sc s4"><div class="si"><i class="fa-solid fa-star"></i></div><div><span class="sv">48.2K</span><span class="sl">Total XP Earned</span></div></div>
    </div>
    <div class="cgrid">
      <div class="card"><div class="ch"><h3>Daily Active Users (7 days)</h3></div><div class="bchart" id="chart1"></div></div>
      <div class="card"><div class="ch"><h3>Recent Signups</h3></div><div id="signups"></div></div>
    </div>
  </section>
  <section class="sec" id="users">
    <div class="sh2"><h2><i class="fa-solid fa-users"></i> User Management</h2></div>
    <div class="card">
      <div class="ch"><h3>All Users</h3><input class="sinput" id="usearch" placeholder="Search users..."/></div>
      <table><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Habits</th><th>Streak</th><th>Status</th><th>Actions</th></tr></thead><tbody id="utbody"></tbody></table>
    </div>
  </section>
  <section class="sec" id="habits">
    <div class="sh2"><h2><i class="fa-solid fa-list-check"></i> All Habits</h2></div>
    <div class="card">
      <div class="ch"><h3>Platform Habits</h3><input class="sinput" placeholder="Search habits..."/></div>
      <table><thead><tr><th>Habit</th><th>User</th><th>Category</th><th>Streak</th><th>Completions</th><th>Status</th></tr></thead><tbody id="htbody"></tbody></table>
    </div>
  </section>
  <section class="sec" id="activity">
    <div class="sh2"><h2><i class="fa-solid fa-clock-rotate-left"></i> Activity Log</h2></div>
    <div class="card"><div class="ch"><h3>Recent Activity</h3></div><div id="actlog"></div></div>
  </section>
  <section class="sec" id="analytics">
    <div class="sh2"><h2><i class="fa-solid fa-chart-bar"></i> Analytics</h2></div>
    <div class="sgrid">
      <div class="sc s1"><div class="si"><i class="fa-solid fa-book-open"></i></div><div><span class="sv">58%</span><span class="sl">Study Habits</span></div></div>
      <div class="sc s2"><div class="si"><i class="fa-solid fa-heart-pulse"></i></div><div><span class="sv">42%</span><span class="sl">Lifestyle Habits</span></div></div>
      <div class="sc s3"><div class="si"><i class="fa-solid fa-trophy"></i></div><div><span class="sv">312</span><span class="sl">Achievements</span></div></div>
      <div class="sc s4"><div class="si"><i class="fa-solid fa-bolt"></i></div><div><span class="sv">21 days</span><span class="sl">Avg Streak</span></div></div>
    </div>
    <div class="card" style="width:100%;margin-bottom:24px;">
      <div class="ch">
        <h3>Weekly Trend: Completions vs SDG Impact</h3>
        <div style="display:flex;gap:12px;font-size:12px;">
          <span style="display:flex;align-items:center;gap:6px;"><span class="dot" style="background:linear-gradient(180deg,var(--ac),var(--ac2))"></span> Completion</span>
          <span style="display:flex;align-items:center;gap:6px;"><span class="dot" style="background:linear-gradient(180deg,#4ade80,#16a34a)"></span> SDG Impact</span>
        </div>
      </div>
      <div class="bchart" id="chart2"></div>
    </div>
  </section>
  <section class="sec" id="settings">
    <div class="sh2"><h2><i class="fa-solid fa-gear"></i> Platform Settings</h2></div>
    <div class="stgrid">
      <div class="card">
        <h3 style="margin-bottom:8px">General</h3>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">Maintenance Mode</div><div style="font-size:12px;opacity:.6">Disable user access temporarily</div></div><div class="tog" onclick="this.classList.toggle('on')"></div></div>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">New Registrations</div><div style="font-size:12px;opacity:.6">Allow new users to sign up</div></div><div class="tog on" onclick="this.classList.toggle('on')"></div></div>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">Email Notifications</div><div style="font-size:12px;opacity:.6">Send daily habit reminders</div></div><div class="tog on" onclick="this.classList.toggle('on')"></div></div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:8px">Features</h3>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">AI Chatbot</div><div style="font-size:12px;opacity:.6">Enable habit coach chatbot</div></div><div class="tog on" onclick="this.classList.toggle('on')"></div></div>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">Leaderboard</div><div style="font-size:12px;opacity:.6">Show public streak rankings</div></div><div class="tog" onclick="this.classList.toggle('on')"></div></div>
        <div class="sti"><div><div style="font-size:14px;font-weight:500">Analytics Export</div><div style="font-size:12px;opacity:.6">Allow users to export data</div></div><div class="tog on" onclick="this.classList.toggle('on')"></div></div>
      </div>
    </div>
  </section>
  <section class="sec" id="chatbot">
    <div class="sh2"><h2><i class="fa-solid fa-robot"></i> AI Coach Chatbot</h2></div>
    <div style="background:var(--sur);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--bor);border-radius:24px;display:flex;flex-direction:column;height:550px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,0.4);position:relative;margin-bottom:24px">
      <div class="ch" style="padding:24px 24px 0;margin-bottom:0;"><h3 style="display:flex;align-items:center;gap:10px;font-size:18px"><i class="fa-solid fa-robot" style="color:var(--th);text-shadow:0 0 10px rgba(250,204,21,.5)"></i> AI Coach</h3></div>
      <div id="cbBody" style="flex:1;padding:24px;overflow-y:auto;display:flex;flex-direction:column;gap:20px;background:radial-gradient(circle at center, rgba(124,106,247,0.05), transparent);">
        <div style="animation:sh 0.3s ease;align-self:flex-start;background:rgba(30,30,53,0.8);backdrop-filter:blur(8px);padding:18px 24px;border-radius:20px 20px 20px 0;max-width:80%;border:1px solid rgba(124,106,247,0.3);box-shadow:0 8px 24px rgba(0,0,0,0.2);">
          <strong style="display:flex;align-items:center;gap:8px;margin-bottom:8px;color:var(--th);font-size:14px;letter-spacing:0.5px;text-transform:uppercase;"><i class="fa-solid fa-bolt" style="color:var(--th);"></i> HabitPulz AI</strong>
          <span style="color:var(--txt);font-size:14px;line-height:1.6;">Hello Admin! How can I help you analyze the user engagement today?</span>
        </div>
      </div>
      <div style="padding:20px;background:rgba(22,22,42,0.8);backdrop-filter:blur(10px);display:flex;gap:12px;border-top:1px solid var(--bor)">
        <input type="text" id="cbInput" placeholder="Type your message..." style="flex:1;background:rgba(0,0,0,.3);border:1px solid var(--bor);color:var(--txt);padding:16px 24px;border-radius:30px;outline:none;font-family:Inter,sans-serif;box-shadow:inset 0 2px 4px rgba(0,0,0,.2);transition:all .2s" onfocus="this.style.borderColor='var(--th)';this.style.boxShadow='0 0 15px rgba(250,204,21,.2),inset 0 2px 4px rgba(0,0,0,.2)'" onblur="this.style.borderColor='var(--bor)';this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,.2)'"/>
        <button id="cbSend" style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--th),#f59e0b);color:#111;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:20px;box-shadow:0 4px 16px rgba(250,204,21,.5)"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  </section>
</main>
<script>
var u=JSON.parse(localStorage.getItem("hp_user")||"null");
if(!u||u.role!=="admin"){window.location.href="login.html";}
var hr=new Date().getHours();
var gr=hr<12?"Good morning":hr<17?"Good afternoon":"Good evening";
document.getElementById("gtitle").textContent=gr+", "+(u.name||"Admin")+" &#128075;";
document.getElementById("aname").textContent=u.name||"Admin";
document.getElementById("av").textContent=(u.name||"A")[0].toUpperCase();
document.querySelectorAll(".ni").forEach(function(n){
  n.addEventListener("click",function(){
    document.querySelectorAll(".ni").forEach(function(x){x.classList.remove("active");});
    document.querySelectorAll(".sec").forEach(function(x){x.classList.remove("active");});
    n.classList.add("active");
    document.getElementById(n.dataset.s).classList.add("active");
  });
});
document.getElementById("logout").onclick=function(){localStorage.removeItem("hp_user");window.location.href="login.html";};
var users=[
  {name:"Admin",email:"admin@HabitPulz.com",role:"admin",habits:12,streak:30,active:true},
  {name:"Alex",email:"alex@HabitPulz.com",role:"user",habits:7,streak:12,active:true},
  {name:"Jordan",email:"jordan@hp.com",role:"user",habits:5,streak:8,active:true},
  {name:"Sam",email:"sam@hp.com",role:"user",habits:9,streak:21,active:false},
  {name:"Taylor",email:"taylor@hp.com",role:"user",habits:3,streak:4,active:true}
];
var hdata=[
  {name:"Read 30 min",user:"Alex",cat:"Study",streak:12,comp:84,active:true},
  {name:"Morning Run",user:"Jordan",cat:"Lifestyle",streak:8,comp:56,active:true},
  {name:"Meditate",user:"Sam",cat:"Lifestyle",streak:21,comp:147,active:false},
  {name:"LeetCode",user:"Alex",cat:"Study",streak:7,comp:49,active:true},
  {name:"Water Intake",user:"Taylor",cat:"Lifestyle",streak:4,comp:28,active:true}
];
var acts=[
  {icon:"&#9989;",bg:"rgba(74,222,128,.15)",text:"Alex completed Read 30 min",time:"2 min ago"},
  {icon:"&#128221;",bg:"rgba(124,106,247,.15)",text:"Taylor signed up",time:"15 min ago"},
  {icon:"&#128293;",bg:"rgba(251,146,60,.15)",text:"Jordan hit an 8-day streak",time:"1 hr ago"},
  {icon:"&#127942;",bg:"rgba(251,191,36,.15)",text:"Sam unlocked Iron Will badge",time:"3 hr ago"},
  {icon:"&#10133;",bg:"rgba(96,165,250,.15)",text:"Alex added habit Journaling",time:"5 hr ago"}
];
function renderUsers(f){
  f=f||"";var tb=document.getElementById("utbody");tb.innerHTML="";
  users.filter(function(x){return x.name.toLowerCase().includes(f)||x.email.toLowerCase().includes(f);}).forEach(function(x){
    tb.innerHTML+="<tr><td><strong>"+x.name+"</strong></td><td style='opacity:.7'>"+x.email+"</td><td><span class='badge "+(x.role==="admin"?"ba":"bu")+"'>"+x.role+"</span></td><td>"+x.habits+"</td><td>&#128293; "+x.streak+"</td><td><span class='dot "+(x.active?"don":"doff")+"'></span>"+(x.active?"Active":"Inactive")+"</td><td><button class='ab ae'><i class='fa-solid fa-pen'></i></button> <button class='ab ad'><i class='fa-solid fa-trash'></i></button></td></tr>";
  });
}
document.getElementById("usearch").oninput=function(){renderUsers(this.value.toLowerCase());};
function renderHabits(){
  var tb=document.getElementById("htbody");tb.innerHTML="";
  hdata.forEach(function(x){
    tb.innerHTML+="<tr><td><strong>"+x.name+"</strong></td><td>"+x.user+"</td><td><span class='badge "+(x.cat==="Study"?"bu":"ba")+"'>"+x.cat+"</span></td><td>&#128293; "+x.streak+"</td><td>"+x.comp+"</td><td><span class='dot "+(x.active?"don":"doff")+"'></span>"+(x.active?"Active":"Paused")+"</td></tr>";
  });
}
function renderActivity(){
  var el=document.getElementById("actlog");el.innerHTML="";
  acts.forEach(function(a){
    el.innerHTML+="<div class='ai'><div class='aico' style='background:"+a.bg+"'>"+a.icon+"</div><span>"+a.text+"</span><span class='at'>"+a.time+"</span></div>";
  });
}
function renderSignups(){
  var el=document.getElementById("signups");el.innerHTML="";
  users.slice(0,4).forEach(function(x){
    el.innerHTML+="<div style='display:flex;align-items:center;gap:12px;padding:8px 0'><div style='width:36px;height:36px;background:rgba(124,106,247,.15);color:var(--ac);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700'>"+x.name[0]+"</div><div><div style='font-size:13px;font-weight:600'>"+x.name+"</div><div style='font-size:11px;opacity:.6'>"+x.email+"</div></div><span class='badge "+(x.role==="admin"?"ba":"bu")+"' style='margin-left:auto'>"+x.role+"</span></div>";
  });
}
function renderChart(id,data, sdgData){
  var el=document.getElementById(id);el.innerHTML="";
  var days=["M","T","W","T","F","S","S"];
  var mx=Math.max.apply(null,data);
  if(sdgData) mx=Math.max(mx, Math.max.apply(null, sdgData));
  data.forEach(function(v,i){
    var content="<div class='bw' style='flex-direction:row;align-items:flex-end;gap:2px;'>";
    content+="<div style='display:flex;flex-direction:column;align-items:center;flex:1;'><div class='bar' style='height:"+Math.round(v/mx*90)+"px;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--ac),var(--ac2));width:100%'></div></div>";
    if(sdgData) {
      content+="<div style='display:flex;flex-direction:column;align-items:center;flex:1;'><div class='bar' style='height:"+Math.round(sdgData[i]/mx*90)+"px;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#4ade80,#16a34a);width:100%'></div></div>";
    }
    content+="</div>";
    el.innerHTML+="<div class='bw' style='flex:1'>"+content+"<span class='blab'>"+days[i]+"</span></div>";
  });
}
renderUsers();renderHabits();renderActivity();renderSignups();
renderChart("chart1",[45,62,58,80,95,70,88]);
renderChart("chart2",[72,68,85,90,78,65,94], [30,45,40,65,70,85,95]);

document.getElementById("cbSend").addEventListener("click", function() {
  var val = document.getElementById("cbInput").value;
  if(!val.trim()) return;
  var b = document.getElementById("cbBody");
  b.innerHTML += "<div style='align-self:flex-end;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;padding:16px 20px;border-radius:20px 20px 0 20px;max-width:80%;box-shadow:0 8px 24px rgba(124,106,247,.3);font-size:14px;line-height:1.5;animation:sh .3s ease'>"+val+"</div>";
  document.getElementById("cbInput").value = "";
  b.scrollTop = b.scrollHeight;
  setTimeout(function(){
    b.innerHTML += "<div style='animation:sh .3s ease;align-self:flex-start;background:rgba(30,30,53,.8);backdrop-filter:blur(8px);padding:18px 24px;border-radius:20px 20px 20px 0;max-width:80%;border:1px solid rgba(124,106,247,.3);box-shadow:0 8px 24px rgba(0,0,0,0.2)'><strong style='display:flex;align-items:center;gap:8px;margin-bottom:8px;color:var(--th);font-size:13px;letter-spacing:.5px;text-transform:uppercase'><i class='fa-solid fa-bolt' style='color:var(--th)'></i> HabitPulz AI</strong><span style='color:var(--txt);font-size:14px;line-height:1.6'>Admin, you said: \""+val+"\". I will generate an engagement report and visual trend shortly. Anything else?</span></div>";
    b.scrollTop = b.scrollHeight;
  }, 1000);
});
document.getElementById("cbInput").addEventListener("keydown", function(e) {
  if(e.key === "Enter") document.getElementById("cbSend").click();
});
</script>
</body>
</html>"""

with open("admin.html", "w", encoding="utf-8") as f:
    f.write(admin)
print("admin.html:", len(admin.splitlines()), "lines")
