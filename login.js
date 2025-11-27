// 🔥 Supabase 연결
const SUPABASE_URL = "https://bpdisxjhhibrgfpvtlmv.supabase.co";
const SUPABASE_KEY = "sb_publishable_PxYuAkvgNTGTiHd9XNUFg_0dR_PIEn"; // 네 공개키
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const msgEl = document.getElementById("msg");

// 로그인 함수
async function login() {
  msgEl.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    msgEl.textContent = error.message;
    return;
  }

  // 로그인 성공 → 역할에 따라 이동
  if (role === "teacher") {
    window.location.href = "teacher_dashboard.html";
  } else {
    window.location.href = "student_home.html";
  }
}

// 회원가입 함수
async function signup() {
  msgEl.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }, // supabase user metadata 에 role 저장
    }
  });

  if (error) {
    msgEl.textContent = error.message;
    return;
  }

  msgEl.textContent = "회원가입 완료! 이제 로그인하세요.";
}