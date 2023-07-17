import * as productsActionTypes from "../actionTypes/productsActionTypes";

const initialState = {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    error:"",
    products:[],
    mainProducts:[],
    ended:false,
    total_expected:0,
    page:1,
    limit:1,
    count:0,
    success:'idle'

};

export default (state = initialState, action) => {
  switch (action.type) {
    case productsActionTypes.GET_PRODUCTS_SUCCESS:
        const { products = [],count } = action.payload
        console.log(products,'products');
        let ended = false;
        const total_expected = Math.ceil(count/state.limit);
        if (state.page == total_expected) {
          ended=true;
        }
        state = {
            ...state,
            products:action.payload.products,
            isLoaded:true,
            isLoading:false,
            hasError:false,
            ended:ended,
            total_expected:total_expected,
            count:count,
            products:products
        }
      break;

    case productsActionTypes.GET_PRODUCTS_LOADING:   
        const {page,limit} = action.payload;     
        state = {
          ...state,
            isLoaded: false,
            hasError: false,
            isLoading: true,
            page:page,
            limit:limit
        }
      break;

    case productsActionTypes.RESET_PRODUCTS:
      const {product} = [action.payload];
      console.log("search",product)
      state = {
        ...state,
        // products:search_products
      }
      break;
    
      case productsActionTypes.GET_MAIN_PRODUCTS_SUCCESS:
        const { mainProducts = [],mainCount } = action.payload
        //console.log(products,'products');
        //let ended = false;
        //const total_expected = Math.ceil(count/state.limit);
        //if (state.page == total_expected) {
        //  ended=true;
        //}
        state = {
            ...state,
            mainProducts:action.payload.mainProducts,
            isLoaded:true,
            isLoading:false,
            hasError:false,
            ended:ended,
            total_expected:total_expected,
            count:mainCount,
            mainProducts:mainProducts
        }
      break;

    case productsActionTypes.GET_MAIN_PRODUCTS_LOADING:   
        //const {mainPage,mainLimit} = action.payload;     
        state = {
          ...state,
            isLoaded: false,
            hasError: false,
            isLoading: true,
            //mainPage:mainPage,
            //limit:limit
        }
      break;

      case productsActionTypes.GET_MAIN_PRODUCTS_FAILURE:
        state = {
          ...state,
          isLoaded: false,
          hasError: true,
          isLoading: false,
          error: action.error,
        };
        break;

    case productsActionTypes.GET_PRODUCTS_FAILURE:
      state = {
        ...state,
        isLoaded: false,
        hasError: true,
        isLoading: false,
        error: action.error,
      };
      break;
    
      case productsActionTypes.SET_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          hasError:false,
          success:'valid'
        });
      
      case productsActionTypes.SET_PRODUCT_FAILURE:
        state = {
          ...state,
          isLoaded: false,
          hasError: true,
          isLoading: false,
          success:'invalid',
          error:action.error
        };
        break;

        case productsActionTypes.SET_PRODUCT_LOADING:
          return Object.assign({}, state, {
            isLoading: true,
            hasError:false
          });
          
    
    default:
      return state;
  }
  return state;
};
