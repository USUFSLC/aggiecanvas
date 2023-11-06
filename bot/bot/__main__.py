from client import swagger_client
import swagger_client

config = swagger_client.Configuration()
config.host = "https://aggiecanvas.linux.usu.edu/api"
api_client = swagger_client.ApiClient(
    configuration=config,
)

aggiecanvas = swagger_client.DefaultApi(api_client=api_client)


def main():
    anumber = input("ANUMBER: ")
    auth_body = swagger_client.models.AuthAggieBody(anumber=anumber)
    aggiecanvas.post_auth_aggie(auth_body)


if __name__ == "__main__":
    main()
