const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const CLIENT_ID =
  "171103722680-b91r63bg0o6bhmtd3vd62ti5ki802ppe.apps.googleusercontent.com";
const API_KEY = "AIzaSyBNnUzoqs3GJDCy_LNIWpSvni3XWX1nneU";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const SPREADSHEET_ID = "18k1pDmwY99ovCVJRhHF_pOIViyLZPKp5yxK1QfspizQ";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTask(task);
    input.value = "";
  }
});

list.addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.toggle("done");
  }
});

function addTask(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task;
  list.appendChild(listItem);
}

gapi.load("client:auth2", initClient);

function initClient() {
    // Google API 클라이언트 초기화
    gapi.client
      .init({
        apiKey: "<AIzaSyBNnUzoqs3GJDCy_LNIWpSvni3XWX1nneU>",
        clientId: "<171103722680-b91r63bg0o6bhmtd3vd62ti5ki802ppe.apps.googleusercontent.com>",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"],
        scope: "https://www.googleapis.com/auth/spreadsheets",
      })
      .then(() => {
        // 초기화가 성공하면 로그인/로그아웃 버튼 상태를 업데이트할 수 있습니다.
        updateLoginStatus();
      })
      .catch(() => {
        console.log("Error initializing Google client Object");
      });
  }
  
  // updateLoginStatus() 함수는 사용자의 로그인 상태를 확인하고, 로그인/로그아웃 버튼 상태를 업데이트하는 기능을 구현합니다.
function updateLoginStatus() {
    const authInstance = gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();
  
    if (isSignedIn) {
      // 로그인된 상태라면 로그아웃 버튼을 보여줍니다.
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "block";
    } else {
      // 로그인되지 않은 상태라면 로그인 버튼을 보여줍니다.
      document.getElementById("loginBtn").style.display = "block";
      document.getElementById("logoutBtn").style.display = "none";
    }
}
  
  // signIn() 함수는 사용자를 로그인시키는 기능을 구현합니다.
function signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(() => {
      updateLoginStatus();
    });
}
  
  // signOut() 함수는 사용자를 로그아웃시키는 기능을 구현합니다.
function signOut() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      updateLoginStatus();
    });
}

function setTodoListToSheet(task) {
  return gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:D", // A부터 D열까지 데이터를 추가합니다.
      valueInputOption: "RAW", // 입력과 동일한 형식으로 값을 쓰려면 'RAW'를 사용합니다.
      insertDataOption: "INSERT_ROWS", // 필요한 경우 새 행을 삽입합니다.
      resource: {
        values: [
          [task] // 이 배열의 차원을 적절하게 변경해야 합니다.
        ]
      }
    })
    .catch((error) => {
      console.error("Error writing data to sheet", error);
    });
}

function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}