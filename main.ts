import { Akord } from "@akord/akord-js";

const getEnv = (variable: string): string => {
  const value = process.env[variable];
  if (!value) throw new Error(`Missing environment variable: ${variable}`);
  return value;
};

const { akord } = await Akord.auth.signIn(
  getEnv("AKORD_USERNAME"),
  getEnv("AKORD_PASSWORD")
);

const vaultName = "Simple NFT example";

const vaults = await akord.vault.list();

console.log(vaults);

let vault = vaults.find((v) => v.name === vaultName);
let vaultId: string;
if (vault) {
  vaultId = vault.id;
} else {
  console.log(`creating vault ${vaultName}`);
  const newVault = await akord.vault.create(vaultName, null, true);
  vaultId = newVault.vaultId;
}

console.log(vaultId);
