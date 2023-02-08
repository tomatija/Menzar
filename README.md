# Menzar
spletna stran za ogled menz

# SETTING UP ENVIROMENT

    ## INTERPRETER
        To get an interpreter path:
            poetry show -v
Powershell: Set-ExecutionPolicy RemoteSigned
According to [THIS GUIDE](https://www.sharepointdiary.com/2014/03/fix-for-powershell-script-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system.html)


# Cron job

Cron jobs won't function on windows machines, so they work only on deployed version of the app.

# HOSTING
## To deploy we need to use firebase
### INSTALLATION
    npm install -g firebase-tools
### LOGIN
    firebase login
### INIT
    firebase init
### DEPLOY
    firebase deploy