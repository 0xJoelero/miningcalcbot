export const supported_gpus = [
  "RX 570 8GB",
  "RX 580 8GB",
  "RX 5500 XT",
  "RX 5600 XT",
  "RX 5700 XT",
  "RX 6700 XT",
  "RX 6800 XT",
  "GTX 1080",
  "GTX 1080 Ti",
  "GTX 1660 Super",
  "RTX 2060",
  "RTX 2070",
  "RTX 2080",
  "RTX 2080 Ti",
  "RTX 3060",
  "RTX 3060 Ti",
  "RTX 3070",
  "RTX 3080",
  "RTX 3090",
];

export const getGpu = (gpuSelected) => {
  switch (gpuSelected) {
    case "RX 570 8GB":
      return {
        gpu_hash_rate: 31000000,
        gpu_mhs: 31,
        gpu_watts: 85,
      };

    case "RX 580 8GB":
      return {
        gpu_hash_rate: 34000000,
        gpu_mhs: 34,
        gpu_watts: 135,
      };
    case "RX 5500 XT":
      return {
        gpu_hash_rate: 26000000,
        gpu_mhs: 26,
        gpu_watts: 80,
      };
    case "RX 5600 XT":
      return {
        gpu_hash_rate: 40000000,
        gpu_mhs: 40,
        gpu_watts: 110,
      };
    case "RX 5700 XT":
      return {
        gpu_hash_rate: 55000000,
        gpu_mhs: 55,
        gpu_watts: 120,
      };
    case "RX 6700 XT":
      return {
        gpu_hash_rate: 48000000,
        gpu_mhs: 48,
        gpu_watts: 140,
      };
    case "RX 6800 XT":
      return {
        gpu_hash_rate: 54000000,
        gpu_mhs: 54,
        gpu_watts: 150,
      };
    case "GTX 1080":
      return {
        gpu_hash_rate: 34000000,
        gpu_mhs: 34,
        gpu_watts: 170,
      };
    case "GTX 1080 Ti":
      return {
        gpu_hash_rate: 39000000,
        gpu_mhs: 39,
        gpu_watts: 180,
      };
    case "GTX 1660 Super":
      return {
        gpu_hash_rate: 31000000,
        gpu_mhs: 31,
        gpu_watts: 75,
      };
    case "RTX 2060":
      return {
        gpu_hash_rate: 30000000,
        gpu_mhs: 30,
        gpu_watts: 120,
      };
    case "RTX 2070":
      return {
        gpu_hash_rate: 40000000,
        gpu_mhs: 40,
        gpu_watts: 140,
      };
    case "RTX 2080":
      return {
        gpu_hash_rate: 41000000,
        gpu_mhs: 41,
        gpu_watts: 160,
      };
    case "RTX 2080 Ti":
      return {
        gpu_hash_rate: 55000000,
        gpu_mhs: 55,
        gpu_watts: 180,
      };
    case "RTX 3060":
      return {
        gpu_hash_rate: 37000000,
        gpu_mhs: 37,
        gpu_watts: 110,
      };
    case "RTX 3060 Ti":
      return {
        gpu_hash_rate: 58000000,
        gpu_mhs: 58,
        gpu_watts: 130,
      };
    case "RTX 3070":
      return {
        gpu_hash_rate: 59000000,
        gpu_mhs: 59,
        gpu_watts: 120,
      };
    case "RTX 3080":
      return {
        gpu_hash_rate: 96000000,
        gpu_mhs: 96,
        gpu_watts: 145,
      };
    case "RTX 3090":
      return {
        gpu_hash_rate: 114000000,
        gpu_mhs: 114,
        gpu_watts: 320,
      };

    default:
      break;
  }
};
