from app import create_app


def test_session(client):
    response = client.post('/session')
    print(response.data)
    assert response.data
