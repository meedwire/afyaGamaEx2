const { parse } = require('path');

console.log("=============== Bem vindo ao sistema de notas ====================\n\n");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function getInfo(message) {
    return new Promise((resolve, reject) => {
        readline.question(message, data => {
            if (data) {
                return resolve(data)
            }
            return reject("A informação é obrigatória !!")
        })
    })
}


(async () => {
    const students = []

    try {

        console.log('Digite os nomes dos alunos e pressine \".\" quando terminar !')
        while (true) {
            const data = await getInfo('Nome do aluno: ');

            if (data === '.') {
                break;
            }

            students.push({ name: data, notes: [] })
        }


        if (students.length > 0) {

            for (let i = 0; i < students.length; i++) {
                console.log(`Digite as notas do aluno ${students[i].name} e pressine \".\" quando terminar !`);

                while (true) {
                    const data = await getInfo("Nota do aluno: ");

                    if (data === '.') {
                        break;
                    }

                    students[i].notes.push(data)
                }

                const average = students[i].notes.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr)) / students[i].notes.length

                students[i].average = average.toPrecision(3)
            }


            const report = students.map((student) => ({ 'Nome do aluno': student.name, 'Nota média': student.average }))

            console.table(report)
        }

        // student.notes.push(await getInfo('Digite a primeira nota: '))
        // student.notes.push(await getInfo('Digite a segunda nota: '))
        // student.notes.push(await getInfo('Digite a terceira nota: '))

        // const average = student.notes.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr)) / 3

        // console.log(`A média do aluno ${student.name} é ${average.toPrecision(3)}`)

        readline.close()
    } catch (error) {
        console.log(error)
        readline.close()
    }
})()



