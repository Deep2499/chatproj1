function sendNotification(message, user) {
    document.onvisibilitychange = ()=> {
      if(document.hidden) {
        const notification = new Notification("New Message", {
          icon: "https://english.onlinekhabar.com/wp-content/uploads/2021/01/facebook-messenger.jpg",
          body: `@${user}: ${message}`
        })
        notification.onclick = ()=> function() {
          window.open("http://localhost:3000/chat")
        }
      }
    }  
  }

export default function checkPageStatus(message, user) {
  if(user === localStorage.getItem("userName")) {
    if(!("Notification" in window)) {
      alert("This browser does not support system notifications!")
    } else if(Notification.permission === "granted") {
      sendNotification(message, user)
    }else if(Notification.permission !== "denied") {
       Notification.requestPermission((permission)=> {
          if (permission === "granted") {
            sendNotification(message, user)
          }
       })
    }
  }     
}
