﻿FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.props .
COPY *.sln .

COPY BLL.App/*.csproj ./BLL.App/
COPY BLL.Base/*.csproj ./BLL.Base/
COPY BLL.Contracts.App/*.csproj ./BLL.Contracts.App/
COPY BLL.Contracts.Base/*.csproj ./BLL.Contracts.Base/
COPY BLL.DTO/*.csproj ./BLL.DTO/
COPY Contracts.Base/*.csproj ./Contracts.Base/
COPY DAL.Base/*.csproj ./DAL.Base/
COPY DAL.Contracts.App/*.csproj ./DAL.Contracts.App/
COPY DAL.Contracts.Base/*.csproj ./DAL.Contracts.Base/
COPY DAL.EF.App/*.csproj ./DAL.EF.App/
COPY DAL.EF.Base/*.csproj ./DAL.EF.Base/
COPY Domain.App/*.csproj ./Domain.App/
COPY Domain.Base/*.csproj ./Domain.Base/
COPY Domain.Contracts.Base/*.csproj ./Domain.Contracts.Base/
COPY Public.DTO/*.csproj ./Public.DTO/
COPY Helpers.Base/*.csproj ./Helpers.Base/
COPY Tests/*.csproj ./Tests/
COPY WebApp/*.csproj ./WebApp/

RUN dotnet restore

# copy everything else and build app
COPY BLL.App/. ./BLL.App/
COPY BLL.Base/. ./BLL.Base/
COPY BLL.Contracts.App/. ./BLL.Contracts.App/
COPY BLL.Contracts.Base/. ./BLL.Contracts.Base/
COPY BLL.DTO/. ./BLL.DTO/
COPY Contracts.Base/. ./Contracts.Base/
COPY DAL.Base/. ./DAL.Base/
COPY DAL.Contracts.App/. ./DAL.Contracts.App/
COPY DAL.Contracts.Base/. ./DAL.Contracts.Base/
COPY DAL.EF.App/. ./DAL.EF.App/
COPY DAL.EF.Base/. ./DAL.EF.Base/
COPY Domain.App/. ./Domain.App/
COPY Domain.Base/. ./Domain.Base/
COPY Domain.Contracts.Base/. ./Domain.Contracts.Base/
COPY Public.DTO/. ./Public.DTO/
COPY Helpers.Base/. ./Helpers.Base/
COPY Tests/. ./Tests/
COPY WebApp/. ./WebApp/


WORKDIR /app/WebApp
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
EXPOSE 80

COPY --from=build /app/WebApp/out ./
ENTRYPOINT ["dotnet", "WebApp.dll"]