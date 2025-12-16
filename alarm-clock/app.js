let currentTime = "";
let alarmInterval = null;

const sound = new Audio("sound.mp3");
sound.loop = true;

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const format = n => n < 10 ? "0" + n : n;

function updateDateTime() {
  const now = new Date();

  document.getElementById("date").innerText =
    `${days[now.getDay()]}, ${format(now.getDate())}/${format(now.getMonth()+1)}/${now.getFullYear()}`;

  const h = format(now.getHours());
  const m = format(now.getMinutes());
  const s = format(now.getSeconds());

  currentTime = `${h}:${m}:${s}`;
  document.getElementById("time").innerText = currentTime;
}

function fill(id, max) {
  const el = document.getElementById(id);
  for (let i = 0; i < max; i++) {
    el.add(new Option(format(i), format(i)));
  }
}

fill("alarm-hour", 24);
fill("alarm-minute", 60);
fill("alarm-second", 60);

function getAlarmDate() {
  const now = new Date();
  const alarm = new Date();

  alarm.setHours(document.getElementById("alarm-hour").value);
  alarm.setMinutes(document.getElementById("alarm-minute").value);
  alarm.setSeconds(document.getElementById("alarm-second").value);

  if (alarm <= now) alarm.setDate(alarm.getDate() + 1);
  return alarm;
}

document.getElementById("start").onclick = () => {
  const alarmTime = getAlarmDate();
  document.querySelectorAll("select").forEach(s => s.disabled = true);

  alarmInterval = setInterval(() => {
    const now = new Date();
    const diff = alarmTime - now;

    if (diff <= 0) {
      sound.play();
      document.getElementById("countdown").innerText = "⏰ Alarm ringing!";
      clearInterval(alarmInterval);
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById("countdown").innerText =
      `Alarm in ${format(h)}h ${format(m)}m ${format(s)}s`;
  }, 1000);
};

document.getElementById("cancel").onclick = () => {
  sound.pause();
  sound.currentTime = 0;
  clearInterval(alarmInterval);
  document.querySelectorAll("select").forEach(s => s.disabled = false);
  document.getElementById("countdown").innerText = "No alarm set";
};

/* THEME TOGGLE */
document.getElementById("themeToggle").addEventListener("change", e => {
  document.body.className = e.target.checked ? "light" : "dark";
});

setInterval(updateDateTime, 1000);
updateDateTime();
