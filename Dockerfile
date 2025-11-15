# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY OCR_Calculator/*.csproj ./OCR_Calculator/
RUN dotnet restore ./OCR_Calculator/OCR_Calculator.csproj

# Copy everything else and build
COPY OCR_Calculator/. ./OCR_Calculator/
WORKDIR /app/OCR_Calculator
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/OCR_Calculator/out .

# Expose port
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OCR_Calculator.dll"]
