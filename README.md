# Ottres
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Project Notes

## Generate project using CLI  
To generate project
Open Git Bash window at Root Folder ( .../WebStormProjects/2021)  
Use CLI command:  
`ng new <projectname> --commit false`  

This will generate a project in the <projectname> folder  
Remove and save any folders ( /src/environments ) you do not want to commit  
modify .gitignore as follows  
`# Sensitive material`  
`/src/environments`  

perform initial commit then  
paste ( src/environments ) folder back  
This folder will now be recognized and ignored by .gitignore  

## Add Firebase support

`ng add @angular/fire`  

paste the following into environment files

`
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebaseConfig: {
apiKey: ,
authDomain: ,
databaseURL: ,
projectId: ,
storageBucket: ,
messagingSenderId: ,
appId: ,
measurementId:
}
`

add the following to the imports [ .... ] section in app.module.ts

`
AngularFireModule.initializeApp(environment.firebaseConfig)
`
### NOTE
Investigate:  
✖ Preparing the list of your Firebase projects
Failed to list Firebase projects. See firebase-debug.log for more info.




