class TestLogic{
    test(request, response){
        response.status(200).send("API in working");
    }
}

module.exports = TestLogic;