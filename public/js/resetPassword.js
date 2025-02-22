const resetPasswordBtn = document.getElementById("resetPasswordBtn");
async function updatePassword() {
  try {
    const newPassword = document.getElementById("newPassword").value;
    const res = await axios.post(
      "http://localhost:3000/password/resetPassword",
      {
        password: newPassword,
      }
    );
    alert(res.data.message);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
    window.location.reload();
  }
}
resetPasswordBtn.addEventListener("click", updatePassword);

/*
FLOW OF CODE
Humne sendMail code ko update kra ki email ka sturcture kaisa hoga
fir humne resetPassword model add kr diya taaki hum ye check kr ske ki jo link email me bheja gya h wo abhi bhi active h ya nhi
fir humne resetPassword and user ke bich me many to one ka relationship add kra
fir humne email me bheje jaane wale link ke liye frontend code add kra aur us frontend bhejne ke liye routes aur controller me backend add kra
aur fir passwords ko update krne ke liye controller me code add kra
*/