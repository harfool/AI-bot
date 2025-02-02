class errorResponse extends Error {
    constructer(message , statusCode){
    super(message);
    this.statusCode = statusCode
    }
}
export default errorResponse