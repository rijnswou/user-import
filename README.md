# Opdracht: User Import

In mijn applicatie heb ik geregeld te maken met grote groepen nieuwe gebruikers die moeten worden toegevoegd. Afhankelijk van een aantal factoren moeten er nog een aantal handelingen gebeuren. Voor deze opdracht is de daadwerkelijke situatie versimpeld voorgesteld.

- De beschikbare informatie bestaat voor elke gebruiker uit een naam, e-mailadres en een rolomschrijving (namelijk STUDENT of TEACHER)
- Door middel van een API-call wordt een User aangemaakt (met informatie naam en e-mailadres)
- Door middel van een API-call wordt een Role aangemaakt (met userId en roleType STUDENT of TEACHER)
- Als de user een STUDENT is, wordt bovendien door middel van een API-call een Portfolio aangemaakt (met userId)

Het handmatig doorlopen van al deze handelingen voor nieuwe gebruikers (x2500) is niet wenselijk. Daarom hebben we alle informatie verzameld in een excelbestand dat kan worden geupload en automatisch verwerkt. Tijdens het verwerken kunnen echter allerlei problemen ontstaan, bijvoorbeeld:

- Eén van de ingevoerde e-mailadressen bestaat al in onze database.
- Eén van de ingevoerde rijen heeft geen naam.
- Eén van de ingevoerde rollen bestaat niet (TEACHR).

We willen dat voor de eindgebruiker duidelijk is waar een fout is opgetreden zodat deze de fout kan herstellen. Wanneer er een fout optreedt willen we niet het hele proces platleggen, want de goede rijen kunnen gewoon worden verwerkt.  Echter, nadat de informatie is gecorrigeerd en het formulier opnieuw wordt verwerkt, moeten de reeds verwerkte rijen of stappen daarvan uiteraard niet opnieuw worden uitgevoerd.

## Opdracht

Breid de repository uit onder de volgende voorwaarden:

- Op basis van de beschikbare informatie wil ik de juiste handelingen uitvoeren (zoals hierboven uitgewerkt).
- Zodra in één van de handelingen een fout optreedt, wil ik met die rij niet verder en wil ik in de UI in een volgende stap zien welke rijen fout zijn en waarom. Je mag de errortekst van de API direct overnemen.
- Wanneer de fouten hersteld zijn en de nieuwe data wordt opgestuurd, moeten de reeds gelukte handelingen niet nog een keer worden uitgevoerd (ik wil natuurlijk geen dubbele users aanmaken).
- De teruggekregen informatie van geslaagde calls hoef je verder niet te verwerken of op te slaan.
- De UI kan wat gebruikersvriendelijker.
- Je mag de MockAPI en de rawData niet aanpassen.
- Je mag de gedefinieerde types in MockAPI natuurlijk wel gebruiken.
- Je mag al het andere wel aanpassen, inclusief het introduceren van nieuwe Types.

Let verder op de volgende dingen van Angular:

- [Single Responsibility](https://angular.io/guide/styleguide#single-responsibility)
- [Component Interaction](https://angular.io/guide/component-interaction)
- [Feature Modules](https://angular.io/guide/feature-modules)

# AssignmentUserImport

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
