// Synchrone

try {
  let jeu;
  try {
    const salaire = travailler();
    const xbox = acheter("xbox", salaire);
    jeu = xbox;
  } catch (err) {
    jeu = "puzzle";
  }
  jouer(jeu);
  bisou;
} catch (err) {
  seLamenter(err);
  rebondir();
}

// Version promesse

const salaireP = travailler(); // Promise<number>

const xboxP = salaireP.then((salaire) => acheter("xbox", salaire)); // Promise<{Xbox, number}>

const jeuP = xboxP.catch((err) => "puzzle"); // Promise<{Jeu}>

const momentFunP = jeuP.then(({ jeu }) => jouer(jeu)); // Promise<{}>

const finalP = momentFunP.then(() => bisou);

finalP.catch((err) => {
  seLamenter(err);
  rebondir();
});

// Promesse

travailler()
  .then((salaire) => acheter("xbox", salaire))
  .catch((err) => "puzzle")
  .then(({ jeu }) => jouer(jeu))
  .then(() => bisou)
  .catch((err) => {
    seLamenter(err);
    rebondir();
  });

// Async / Await

try {
  let jeu;
  try {
    const salaire = await travailler();
    const xbox = await acheter("xbox", salaire);
    jeu = xbox;
  } catch (err) {
    jeu = "puzzle";
  }
  await jouer(jeu);
  return bisou;
} catch (err) {
  seLamenter(err);
  rebondir();
}
