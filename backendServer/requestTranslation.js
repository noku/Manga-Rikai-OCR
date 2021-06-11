const fetch = require('node-fetch');

async function sendMessageToServer(thisContent, thisMessage) {  
	let result = await fetch(`http://localhost:3567/`)
	console.log(await result.text())
		//.then(res => res.json())
		//.then(json => console.log(json));
}

sendMessageToServer("ありがとう。来てくれて、嬉しいよ", "test")

// function sendMessageToServer(thisContent, thisMessage) {  
// 	fetch(`http://localhost:3567/`, {
// 			method: 'post',
// 			body:    JSON.stringify({content: thisContent, message: thisMessage}),
// 			headers: { 'Content-Type': 'application/json' },
// 		})
// 		.then(res => console.log(res))
// 		//.then(res => res.json())
// 		//.then(json => console.log(json));
// }

