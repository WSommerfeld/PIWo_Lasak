# Projektowanie interfejsów webowych
### Lab1 
Utworzenie prostej strony w HTML z użyciem CSS.  
### Lab2 
Utworzenie prostej ToDo listy w HTML, z wykorzystaniem JavaScript. 
### Lab3 
Strona z Lab1 w React.  
Hosting Vercel: https://piwo3.vercel.app/  

Hosting Firebase nie działa dla stron SSR, a taka właśnie jest tworzona przez polecenie z instrukcji. 
### Lab4 
Projekt z lab3 przebudowany na CSR korzystający z Firestore.  
Hosting Firebase: https://piwo3slowo.web.app/    

Z racji konieczności przebudowy strony z SSR na CSR, tak aby działała na Firebase, utworzono osobny projekt. Przebudowano całość strony i usunięto @react-router/node, @react-router/serve, @react-router/dev, react-router build, react-router dev, i wszystkie inne pakiety i skrypty związane z SSR (używane w szablonie remix-run/react-router-templates/javascript). Tak więc lab3 jest projektem SSR hostowanym na Vercelu, natomiast lab4 projektem CSR hostowanym na Firebase z wykorzystaniem bazy danych Firestore. 
### Lab5
