export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

let UUID = 1;

export function getUniqueID(): number {
  UUID++;
  return UUID;
}

export const strtolower = (str: string) => str?.toLowerCase();
