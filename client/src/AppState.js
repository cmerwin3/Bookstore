class AppState {
    static DISPLAY_MODE_HOME = 'home';
    static DISPLAY_MODE_LIST = 'list';
    static DISPLAY_MODE_ITEM = 'item';
    static DISPLAY_MODE_LOGIN = 'login';
    static DISPLAY_MODE_REGISTRATION = 'registration';
    static DISPLAY_MODE_CHECKOUT = 'checkout';
    static DISPLAY_MODE_SHOPPING_CART = 'shopping cart';
    
    constructor() {
        this.displayMode = AppState.DISPLAY_MODE_HOME;
        this.user = undefined;
        this.bookList = [];
        this.bookItem = undefined;
        this.shoppingCart = [];
        this.homeMessage = undefined;
    }
    
    clone() {
        let newAppState = new AppState();

        newAppState.displayMode = this.displayMode;
        newAppState.user = this.user;
        newAppState.bookList = this.bookList;
        newAppState.bookItem = this.bookItem;
        newAppState.shoppingCart = this.shoppingCart;
        // home message is only used upon load of home page and othewise set to undefined
        newAppState.homeMessage = undefined;

        return newAppState;
    }
  }

export default AppState;