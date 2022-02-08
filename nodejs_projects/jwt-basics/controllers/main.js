const login = async (req, res) => {
    return res.status(200).send("Fake Login/Signup/Register route");
}

const dashboard = async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);

    return res.status(200).json({ msg: `Hello, Shankar Doe`, secret: `Hi there lolicon, here is your secret ${randomNumber}` })

}

module.exports = { login, dashboard }