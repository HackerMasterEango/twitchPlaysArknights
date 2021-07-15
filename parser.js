// PLACE UNIT
// ===========
// 1 <pos> right


// ACTIVATE UNIT
//==============
// use <pos>


// UNDEPLOY UNIT
// undep <pos>


const { DOWN, UP, RIGHT, LEFT } = require('./operatorDirectionEnum')

const parse = message => {
    const splitMsg = message.split(' ')

    // If three words, check if chatter is trying to place operator.
    if (splitMsg.length === 3) {
        if (!splitMsg[0].match(/^\d/)) {
            console.log('message not include operator at start')
            return false
        }

        const opNumber = parseInt(splitMsg[0])
        if (opNumber === 0 || opNumber > 11) {
            console.log('invalid operator')
            return false
        }

        // Placement format is letter followed by number 0-9
        const placementTile = splitMsg[1].toLowerCase()
        if (!placementTile.match(/[a-zA-Z][0-9]/)) {
            console.log('message doesnt give valid position')
            return false
        }

        if (![ UP, DOWN, LEFT, RIGHT ].includes(splitMsg[2].toLowerCase())) {
            console.log('message doesnt have valid direction')
            return false
        }

        const opDirection = splitMsg[2].toLowerCase()

        return {fn: 'deployOperator', args: [ opNumber, placementTile, opDirection ] }
    }

    if (splitMsg.length === 2) {
        if (splitMsg[0].toLowerCase() === 'use') {
            // validate this later for specefic json file provided later
            const placementTile = splitMsg[1]
            return { fn: 'activateOperator', args: [ placementTile ]}
        }
    }

    if (splitMsg.length === 2) {
        if (splitMsg[0].toLowerCase() === 'undep') {
            // validate this later for specefic json file provided later
            const placementTile = splitMsg[1]
            return { fn: 'undeployOperator', args: [ placementTile ]}
        }
    }

    return false
}


module.exports = {
    parse
}