const emailTemp = (data) => {
    return `
        <!DocumentType html>
        <head>
            <title>Speedfix Request from ${data.name}</title>
        </head>
        <body>
            <p><strong><h4>Name</h4>:</Strong> ${data.name}</p></br>
            <p><strong><h4>Email</h4>:</Strong> ${data.email}</p></br>
            <p><strong><h4>Phone Number</h4>:</Strong> ${data.phoneNumber}</p></br>
            <p><strong><h4>Address</h4>:</Strong> ${data.address}</p></br>
            <p><strong><h4>Description</h4>:</Strong> ${data.desc}</p></br>
            
        </body>
        </html>
    `
}
module.exports = { emailTemp };