import io from 'socket.io-client'

const socket = io("http://20.74.8.134/", {
    auth: {
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDg4ZTQwOWJlNjhmMDAxMWI4NWEyOSIsInJvbGUiOiJDT00iLCJpYXQiOjE2MjQ5MjEzNzYsImV4cCI6MTYyNDkyNDk3Nn0.MZtR5jaUf-pVPGJei_P0vDGqZO2D8-MPVyRvwB1_FFs",
    },
});

socket.on("connect", () => {
    console.log("connect !!")
});

socket.on("event", (data: any) => {
    console.log(data)
});