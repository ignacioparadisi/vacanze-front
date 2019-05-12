/***************************************************
* Declaracion para poder importar JSON por default *
****************************************************/
declare module "*.json" {
    const value: any;
    export default value;
}