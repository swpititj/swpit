
const onSubmit = async (e, startDate, token, idSurvey, URLAPI) => {

    e.preventDefault()

    const endDate = new Date().getTime()

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let answers = [[], [], [], [], [], [], [], [], [], []]
    const keys = Object.keys(formJson)
    const values = Object.values(formJson)

    keys.map((key, i) => {
        const [idSection, idQuestion] = key.split('-').map(i => parseInt(i))
        answers[idSection][idQuestion] = parseInt(values[i])
    })

    answers = answers.filter(value => !(value.length === 0))

    const body = {
        respuestas: answers,
        HoraInicio: startDate,
        HoraFinal: endDate
    };

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
    };

        const response = await fetch(URLAPI + "/resultados/" + idSurvey, options)
        const data = await response.json()
        if(!response.ok){
            return [null, data]
        }
        return [data, null]
}

export { onSubmit }