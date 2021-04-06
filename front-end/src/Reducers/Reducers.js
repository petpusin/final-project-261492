

const initialLogin = {
    loginState: 0
}

export const loginStatus = (state = initialLogin, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                ...state,
                loginState: state.loginState = 1
            }
            break
        case "LOGOUT":
            state = {
                ...state,
                loginState: state.loginState = 0
            }
            break

        default:
    }
    return state
}


const initialConsense = {
    ConsenseState: false
}

export const consenseReducer = (state = initialConsense, action) => {
    switch (action.type) {
        case "SHOW_CONSENSE":
            state = {
                ...state,
                ConsenseState: state.ConsenseState = true
            }
            break
        case "CLOSE_CONSENSE":
            state = {
                ...state,
                ConsenseState: state.ConsenseState = false
            }
            break

        default:
    }
    return state
}

const GenderSelection = {
    GenderState: 'null'
}

export const genderSelectionReducer = (state = GenderSelection, action) => {
    switch (action.type) {
        case "SET_MALE_GENDER":
            state = {
                ...state,
                GenderState: state.GenderState = 'male'
            }
            break
        case "SET_FEMALE_GENDER":
            state = {
                ...state,
                GenderState: state.GenderState = 'female'
            }
            break

        default:
    }
    return state
}

const InitialOrderListState = {
    OrderSubmitState: false,
    FoodDemandState: false,
    CancelState: false
}

export const orderlistReducer = (state = InitialOrderListState, action) => {
    switch (action.type) {
        case "SHOW_SUBMITBOX":
            state = {
                ...state,
                OrderSubmitState: state.OrderSubmitState = true
            }
            break
        case "CLOSE_SUBMITBOX":
            state = {
                ...state,
                OrderSubmitState: state.OrderSubmitState = false
            }
            break
        case "SHOW_DEMANDBOX":
            state = {
                ...state,
                FoodDemandState: state.FoodDemandState = true
            }
            break
        case "CLOSE_DEMANDBOX":
            state = {
                ...state,
                FoodDemandState: state.FoodDemandState = false
            }
            break
        case "SHOW_CANCELDBOX":
            state = {
                ...state,
                CancelState: state.CancelState = true
            }
            break
        case "CLOSE_CANCELBOX":
            state = {
                ...state,
                CancelState: state.CancelState = false
            }
            break

        default:
    }
    return state
}

