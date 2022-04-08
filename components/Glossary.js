// import glossaryFile from '../workshops/terms/glossary.yaml'

// export function Glossary (currentHTML, glossaryFile) {
//     // create array of terms and definitions
//     const termsAndDefs = []
//      Object.keys(glossaryFile).forEach(key => {
//         let termAndDefinition = glossaryFile[key]
//         let term = Object.keys(termAndDefinition)[0]
//         let definition = termAndDefinition[term]
//         let termAndDefinitionArray = [term, definition]
//         termsAndDefs.push(termAndDefinitionArray)
//     })


//     // if a term is an exact match to text in the currentHTML, make it a link to a popup
//     termsAndDefs.forEach(termAndDefinition => {
//         if (currentHTML.indexOf(termAndDefinition[0]) > -1) {
//             let term = termAndDefinition[0]
//             let definition = termAndDefinition[1]
//             let termAndDefinitionArray = [term, definition]
//             let termAndDefinitionString = termAndDefinitionArray.join('|')
//             let link = `<a href="javascript:void(0)">${term}</a>`
//             currentHTML = currentHTML.replace(term, link)
//         }
//     })

//     return currentHTML
// }