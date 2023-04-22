// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  //  await prisma.table.deleteMany();
  await prisma.review.deleteMany();
  await prisma.items.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.location.deleteMany();
  await prisma.facilities.deleteMany();
  await prisma.user.deleteMany();

  await prisma.location.createMany({
    data: [{ name: "lagos" }, { name: "abuja" }, { name: "ibadan" }],
  });

  await prisma.facilities.createMany({
    data: [{ name: "breakfast" }, { name: "free wifi" }, { name: "swimming pool" }],
  });

  const locations = await prisma.location.findMany();
  const falicities = await prisma.facilities.findMany();

  const breakfastFacilitiesId =
    falicities.find((facility) => facility.name === "breakfast")?.id || 1;
  const wifiFacitiliesId =
    falicities.find((facility) => facility.name === "free wifi")?.id || 1;
  const poolFacilitiesId =
    falicities.find((facility) => facility.name === "swimming pool")?.id || 1;

  const lagosLocationId =
    locations.find((location) => location.name === "lagos")?.id || 1;
  const abujaLocationId =
    locations.find((location) => location.name === "abuja")?.id || 1;
  const ibadanLocationId =
    locations.find((location) => location.name === "ibadan")?.id || 1;

  await prisma.hotel.createMany({
    data: [
      // LAGOS //
      {
        name: "Radisson Blu Anchorage Hotel",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/321441959.webp?k=cbbf019c9e30aedb4baf3a710ead51f9eec30674e7e852a8a42988e1816d9fc3&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Offering outdoor pool and a spa with a wellness centre, Radisson Blu Anchorage Hotel is located in Lagos. Free Wi-Fi access is available.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321441959.jpg?k=ce000a7ae2797d40e4d056b72c03fddf7e2c0c5c867a28b6df9253399dab17ea&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321441991.jpg?k=dc65791a63fa2264bc0435c997734a361427e882c1f2b26bd2bfe1d5ed44e94c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321442000.jpg?k=b57b8bd14783a10193b59a02bdbf9c02e520767c2a4cc55a41a4e3944b7cf510&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321442000.jpg?k=b57b8bd14783a10193b59a02bdbf9c02e520767c2a4cc55a41a4e3944b7cf510&o=&hp=1",
        ],
        open_time: "14:30:00.000Z",
        close_time: "21:30:00.000Z",
        slug: "radisson-blu-anchorage-hotel-lagos",
        location_id: lagosLocationId,
        Facilities_id: poolFacilitiesId,
      },
      {
        name: "Morning Side Suites",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x…7a266c724d5b4874645c4cedd107a24e870bfd1c7&o=&hp=1",
        price: PRICE.CHEAP,
        description:
          "Well situated in Lagos, Morning Side Suites offers air-conditioned rooms with free WiFi, free private parking and room service.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x…077768f7da8cdf039dd1f6d295dc1f4fb0da512d7&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296694807.jpg?k=95da8f263cab0a2e6eb488b9880c02aebc9217f283150ca000b4693c6d2b5be4&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204737249.jpg?k=75bcaa955bb74089ff346dcb051ad1531ba2a0ef64eceb44457f9c190417935e&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/237264677.jpg?k=c7e2358e283c0329c75d0d615c3441e3463b9f0a239280c725dd351b35eb1254&o=&hp=1",
        ],
        open_time: "12:30:00.000Z",
        close_time: "22:00:00.000Z",
        slug: "morning-side-suites-lagos",
        location_id: lagosLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "Lagos Marriott Hotel Ikeja",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/439499370.webp?k=d2d55f9d710372f91f8e14dd53ac9b7564a767f14ecfb1af87d5e2fe75d8ab86&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Set in Lagos, 3.2 km from Kalakuta Museum, Lagos Marriott Hotel Ikeja offers accommodation with an outdoor swimming pool, free private parking, a terrace and a restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439499166.jpg?k=0cf46740ea80ed006d96ce4e3ea75fba24993e1375b1f681052f8a51a9ed40a2&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439499139.jpg?k=d71cf5d24dd7a274ff7b12e31ddac007b9f0859aafba17cbceae031ff832622f&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439499154.jpg?k=5a4002d4b187631d0df01cb1bd2a0fbed39c5be2ddc584ae13b139e12640e5a7&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439499111.jpg?k=34203ebdf64935cd0adbc3c0dfd176a3403764d0a8124e0cf0e1f452974b3da9&o=&hp=1",
        ],
        open_time: "17:30:00.000Z",
        close_time: "22:00:00.000Z",
        slug: "lagos-marriott-hotel-ikeja",
        location_id: lagosLocationId,
        Facilities_id: poolFacilitiesId,
      },
      {
        name: "Exclusive Upscale 1 Bedroom Apartment in Lekki phase 1",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/422301873.webp?k=35729412d82406f7a5b6d8c470f5dbe3c8ae912e7f86f109529d713f507d0bdd&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Exclusive Upscale 1 Bedroom Apartment in Lekki phase 1 is set in the Lekki Phase 1 district of Lagos, 2.6 km from Landmark Beach, 600 metres from Nike Art Gallery and 6.6 km from Red Door Gallery.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/422301873.jpg?k=92338b3d7e092958621d2842980315afd728a0a4bd6e9eff87809b0c32d59dad&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/422941629.jpg?k=7d2c8333a0254a312be73dbad0e0b1d778f2d26b6cc802b18854ba08c433b6a9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/422301920.jpg?k=ab9b425ae0c6535bbdb0a100e1f1d6bac2705d6506b5485b3e93b65cd0342828&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/422301921.jpg?k=5b958e4ae2d86b9b63bbabf798a8fb076c1b287e901ca39a36e6fab249a4ce92&o=&hp=1",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "exclusive-upscale-1-bedroom-apartment-in-lekki-phase-1-lagos",
        location_id: lagosLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "Four Points by Sheraton Lagos",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/29845456.webp?k=affa1a07b0bb2c29ddd3723dd5e0a9f925294cd324ff9aaade2d3fd6d506e612&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Boasting a terrace and a bar, Four Points by Sheraton Lagos is attractively set in the heart of Lagos, 2 km from Nike Art Gallery.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/29845456.jpg?k=32edb1ff2e320a1c70d40e7ba7df6d9e1c2a825254f407bcd91e70b00e244b83&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/411446249.jpg?k=f539520bbfeb082c6e2baa92a3b8c961892a003a45b82dc5699fb99bfc07fe18&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/29845443.jpg?k=83f4136c916c28786753f4d318c091c7fed8726772b8d94e80c9ea747a99555c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/29845460.jpg?k=fedea4e3e15bc26c8cab53666a336838acb2db0786aed8d9ddb6be3b74abb19a&o=&hp=1",
        ],
        open_time: "16:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "four-points-by-sheraton-lagos",
        location_id: lagosLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "Nordic Hotel Lagos",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/318110349.webp?k=28990ab7e76ebed14a00070899ccbbc9955428903eb4659d924c57f505e7b8db&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Located within 550 meter of Mega Plaza Century 21 Mall in Lagos, Nordic Hotel Lagos provides a restaurant and a fitness centre.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/349698252.jpg?k=9ea30ba301e42d62e09cac02233473622123daaa3ce0abe67473d705945760a3&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318480424.jpg?k=596ef92a91319fb07ea3930f00c47d0d57f6e58571cc45f856f1c873a750c448&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318324885.jpg?k=d43fc5e57c03aac451de1028d86b47ff5156e324c1006dec3e9e70aafabbbf43&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318109913.jpg?k=e2a952a7e20573027cae1e03e3082073d4a0b04dbb15e145b29b7d2a15c5a974&o=&hp=1",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "nordic-hotel-lagos",
        location_id: lagosLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "The GilGal",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/151195997.webp?k=4b0a79799a46cb953dd3fc1f98842ae99af7e511480b28d04bcd7e58ac0e1b84&o=&s=1",
        price: PRICE.CHEAP,
        description:
          "Offering free WiFi and an outdoor pool, The GilGal is set in Lekki Phase 1. The pet-friendly accommodation is air conditioned and features a hot tub. Free private parking is available on site.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346757005.jpg?k=64e7cc0e99b574ab4fd3143aa5d799a7b76c17489d85e959774ba8da114b9791&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346756846.jpg?k=b514bfc1497ba3295589adcdc6718e28ffa0d9c518be052742ec993f1ddcb48b&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/square200/151195997.webp?k=4b0a79799a46cb953dd3fc1f98842ae99af7e511480b28d04bcd7e58ac0e1b84&o=&s=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346756931.jpg?k=f398cb1815fcf8546b564f36941ff3b9c32e093be9fc7971d83aaee01809338a&o=&hp=1",
        ],
        open_time: "14:00:00.000Z",
        close_time: "19:00:00.000Z",
        slug: "the-gilgal-lagos",
        location_id: lagosLocationId,
        Facilities_id: poolFacilitiesId,
      },
      {
        name: "Victoria Crown Plaza Hotel",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/334754471.webp?k=8bc1b380f0b502571de07aea04eb230ceece43fb47ae0ce9a4d223f09ea7544a&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Offering an outdoor pool and a restaurant, Victoria Crown Plaza Hotel Hotel is located in Victoria Island City. Free Wi-Fi access is available.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334754471.jpg?k=3ef34ae726431e31fb0bfb3a939e4311e8157294a32cc3156a7b1743706cc4ed&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334758828.jpg?k=abb1edc0365b0654b944c2e3b7f95e60e7688e9ffb3f7d0dbc119f671cb0b94c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/351326082.jpg?k=23355c6ce17a77b313f33fa9750fe8a7849b48a27f056d1ae7732bd764e6704e&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334787282.jpg?k=ac222070e3dfe33e71a40e5ade2bfe44590c302f8c1d16f923321dbf90b5befa&o=&hp=1",
        ],
        open_time: "12:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "victoria-crown-plaza-hotel-lagos",
        location_id: lagosLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      //Abuja//
      {
        name: "Transcorp Hilton Abuja ",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/219629744.webp?k=da94fba0f69894185554f703587ce1062bc3c89833a0f09cf4de7aa66b3b10d9&o=",
        price: PRICE.EXPENSIVE,
        description:
          "Offering an outdoor pool and views of the mountains, Transcorp Hilton Abuja is set in Abuja. Guests can enjoy the on-site restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/152318521.jpg?k=557db76c9752710e032196dd79132c58a328debe825d308c269ac1a507b6bb56&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/152340459.jpg?k=f0a08fc9d30632917c37e4a45b8d25dc75e7e462ee63a43be935f4d3aaf7a601&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/240180682.jpg?k=d89eeaec75018107158f0169be3cdcc5dca29c251a13dde7bea44aa047dfc8b4&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/218614755.jpg?k=c6747bad716cc36a83a9a16174a8110ae3ef75ec6434950dd3f85184d4f6ff21&o=&hp=1",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "transcorp-hilton-abuja ",
        location_id: abujaLocationId,
       Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "Best Premier Maitama Residence",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/357319589.webp?k=d133a5a83471cd156798967e15fea5f1f38b346c486555706c35a89549048a4f&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Situated in Abuja, 5.6 km from IBB Golf Club, Best Premier Maitama Residence features accommodation with a shared lounge, free private parking, a terrace and a restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333360862.jpg?k=e7f7ae71c279e640b0f9f379084fcee274268e6a852ce7d3ea4075b6fa9f3876&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412271263.jpg?k=d19b01f32d7cfa98d25a6ee910e9887b7f4206ba90317070ce73c222be36606c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/329537415.jpg?k=e66a1b2ed052219636c17914f81f866398980b5567b71c1e6223efa92280c0e7&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/356092854.jpg?k=981f0359b55aba2e31b014629b9b17779ed323a43da46e55116cf91aaae27b10&o=&hp=1",
        ],
        open_time: "16:00:00.000Z",
        close_time: "19:00:00.000Z",
        slug: "best-premier-maitama-residence-abuja",
        location_id: abujaLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "The Destination by Gidanka",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/423059864.webp?k=9bf108ce80e26a7dca912d32f6533fd9d0bb08665b51d7cae2365a4eb95769cc&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "The Destination by Gidanka has free bikes, outdoor swimming pool, a fitness centre and garden in Abuja.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428339101.jpg?k=06df622184f52cd1790487f316dcdfc622be87ab0b1f374e5d5b9587e007f7d9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428338996.jpg?k=2309653a5893a3c440e47434dcda55c84617ca91212810a9bbdae6696515cc0a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428338864.jpg?k=c590d0aad96c08dee0d302500b439fea8f5ed944a2890e72df00bf2e8887fd43&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428338733.jpg?k=fc2dc47e0d66443c7c5f32ee53e765c1f35211edb04378e203a8332ded6623b9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428338407.jpg?k=856733db2528b2151a3d6b3bc0bc219a194945bd803cfbd19dbbc5cf5bc4f70f&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428338157.jpg?k=14bd935ab6b292d3dabe4d77c54d6dbf3737083e23348e7c19a2e44d684f7986&o=&hp=1",
        ],
        open_time: "12:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "the-destination-by-gidanka-abuja",
        location_id: abujaLocationId,
        Facilities_id: poolFacilitiesId,
      },
      {
        name: "Aveon Hotel",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/403695434.webp?k=4206f01f819e079d3b3c6183877ff16b733f84a512e55e1779123aa1be2ad85f&o=&s=1",
        price: PRICE.CHEAP,
        description:
          "Set in Abuja, 12 km from IBB Golf Club, Aveon Hotel offers accommodation with an outdoor swimming pool, free private parking, a fitness centre and a shared lounge.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/425142317.jpg?k=9263c5ca027ab2d083e458cb2e4099783a6307e7ba7d78ddec090d527c75172f&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/399044978.jpg?k=82a0484a584a577c8f60fd60973e2294576dbc7a3504ccac8566d4e9a427aa2a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402101233.jpg?k=f8bf22cdf667ab84c7e6217106af3a4761795745f9b6df3ab202fde20e74e483&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402102547.jpg?k=67382040f5105c775ce1d7257cc106f534b247c16826a51487b553c3bb7c0576&o=&hp=1",
        ],
        open_time: "09:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "aveon-hotel-abuja",
        location_id: abujaLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "Mayfair Hotel Wuse2 Abuja",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/407739889.webp?k=3477ef8c96079ddc3d998705e073c0a78b95e3c735622441d872784bcb81b90d&o=&s=1",
        price: PRICE.CHEAP,
        description:
          "Located in Abuja, 6 km from Magic Land Abuja, Mayfair Hotel Wuse2 Abuja provides accommodation with a restaurant, free private parking and a bar.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407740084.jpg?k=449b715471bac5c9cd609dd63aea7dca306a30dd1b3b5dbd5451a88ee9b3f272&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407740083.jpg?k=f471585498aeba3aa70f9b4990ffc9e10cc5bbfb229bcd484dbb8fff94060109&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407740082.jpg?k=eb91c34e80ac01d50bc436c582f0bc4dfbc2ebdb14ea09531830cc2166fc194d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407740079.jpg?k=bc82928f2fc0cc0a983f85cb65583d355c0a9e8a63d8248d82df243080f65b57&o=&hp=1",
        ],
        open_time: "09:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "mayfair-hotel-wuse2-abuja",
        location_id: abujaLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "E-Suite Hotel",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/308412530.webp?k=64fff78ccf8603f8d49cfe87646abf171d31e6c38414d5861bbebb036763ede5&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Located in Abuja, 7.3 km from IBB Golf Club, E-Suite Hotel provides accommodation with a restaurant, free private parking and a bar.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/308412536.jpg?k=3621529ac76836e384bd6f15c66eace88d50957660b79eb6bdf5e0b7079ebfd3&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/308412531.jpg?k=b728622f5b5930bc4a76e147079d43fc2f1295fd6ce688451561ca3d99069c20&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/308412538.jpg?k=bd417e7cbfb1bb156df37c4a943a7761dfa11464baa031c43ff2d560ba752685&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/309335511.jpg?k=6f950ff17b3112b094ab1b08db8a367f2c21ce469af4011a77bf852f44d58ac3&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/309282476.jpg?k=99726f0f303f4299406f7bb1a5ac0c3d34c4c07e46c155ca150b55498a6ae89e&o=&hp=1",
        ],
        open_time: "15:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "e-suite-hotel-abuja",
        location_id: abujaLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "Residency Hotel Utako Abuja",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/356703851.webp?k=c435e7c866f5c5428db8d888268aabf38f3424f949cc5f06fe14cc6f6919c913&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Set 4.8 km from Magic Land Abuja, Residency Hotel Utako Abuja offers 3-star accommodation in Abuja and features a fitness centre, a restaurant and a bar.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287347507.jpg?k=e275517542f118481d7b6edb447c044bf2abcbef29e6d5210f28eb689eca2f1c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287347521.jpg?k=1d4b86681d1a4c3d1cb05aecd52ec3a50bb468278cd8857eb0c82fbe8d9a44ca&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287347510.jpg?k=3f3a865d6aee11c2cb6b473b7d9a4812a121685930ce031acff15ebba002104c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/286521938.jpg?k=6f8f022bd40d5eeb605d94befb339599c0db7eaacdc1c3b2a09e1fdb3f72a4a2&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287626333.jpg?k=ed3e6cd328708d9b1935bf9cc5c2cfa51908e6d24d53fda84ad0597b8fc09083&o=&hp=1",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "residency-hotel-utako-abuja",
        location_id: abujaLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "Tranquil Mews Hotel",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/196001298.webp?k=73ac3062fd3bfee06e20547e96f1b6ae6bd87ff3a8285d2730151ecce67e4306&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Offering a restaurant, Tranquil Mews is located in Abuja. Free WiFi access is available. Each room here will provide you with a TV, air conditioning and a terrace.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196340483.jpg?k=8ad6be4f6de0c79780cd65183ad33d93369d855040ace073f815fea60ee19229&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196340533.jpg?k=47e3eaee557a1b11a2bafc153201961a6ea18e456ef5f0e866735338a5181e23&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196127078.jpg?k=9ca7dcec1c9f47f410b93269412113a768635d7a98c485c850c3e17e7ad080a8&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196126008.jpg?k=8b434d7e4125bd5affbeb08f8c9ff2b56808dcea54750bbd5ecbca383acf7f55&o=&hp=1"
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "tranquil-mews-hotel-abuja",
        location_id: abujaLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "BON Hotel Abuja",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/94964647.webp?k=f9c11d6777273c3c9e7c7b23fd374a6c8a043dc71d0c7d6977fe4a68f80edc6e&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Situated in Abuja, 8.3 km from Magic Land Abuja, BON Hotel Abuja features accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/182485103.jpg?k=207cdde25a8fd338a5758ce6598c0dfa4038719f715f7abc52d479dcf987d4ad&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/182485178.jpg?k=2f70527c980eeaaec0117ae01043a8b6aa0f8d9a8315d2728f182af758091430&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/143950732.jpg?k=44a22a6688bb61bbd0d33fe90509ba9175a6702306f737d6ca164e06b9d72316&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/94964618.jpg?k=28c17243783c0ac1b0d8b2f47daecc05494ab2f5f4bd9a4cd160cc4fe6e5175a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/94964614.jpg?k=a9c7c4265afb5b8dc8d60b07ae5f4943fd9262da4e2c6422145ea830164cb90a&o=&hp=1",
        ],
        open_time: "13:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "bon-hotel-abuja",
        location_id: abujaLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      //Ibadan//
      {
        name: "Adis Hotels Ibadan",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/202723074.webp?k=10a89693c3009bd3943141069bf0e82bceaf66aa0c8271fb33a54791ae650448&o=",
        price: PRICE.CHEAP,
        description:
          "Located in Ibadan, 12 km from IITA Forest Reserve, Adis Hotels Ibadan provides accommodation with a shared lounge, free private parking, a restaurant and a bar.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/131098009.jpg?k=559d486de0ec06527e6141e13f6cc8728244be2efbc487455e1ce424d84da0b8&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/131097966.jpg?k=4c9696ad4173f45adf73740ae1810f515b0b7feff86b42ad00cbfa9cd87564d1&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/44273284.jpg?k=d5c79f64b5db20f5f86c950fcde01ba82e5650dc2f09548764eafa57d20b5b7d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261291923.jpg?k=2f2f3f7c2c371f5d1406fb8edf0442530a93c99d1613d5df5fbd62b0a48d3fc6&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261291783.jpg?k=7f8346c8d33625cbc1fe153a113a7b65122105abe36252ce13ae3e5e2c764899&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261291674.jpg?k=a25bfe0f7abf2989c809df3cd1d0294edd1a8bf89b52c77ecd2f41a72fc0419a&o=&hp=1",
        ],
        open_time: "15:00:00.000Z",
        close_time: "22:00:00.000Z",
        slug: "adis-hotels-ibadan",
        location_id: ibadanLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "Adis Hotels Prime",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/422470371.webp?k=84d805666072917ad700a16f431ebe550364af950d8e676d83a9aecfea8301d2&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Situated in Ibadan, 11 km from IITA Forest Reserve, Adis Hotels Prime features accommodation with an outdoor swimming pool, free private parking, a shared lounge and a restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/432511294.jpg?k=795d68b33cab7e34d2365473ccc537f0114e3f8ac86fad762c3eb95db0f4ac31&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/432510468.jpg?k=1805ad3a5cb844f5a05714ec4a31d7ea557dfd02fddbcef5509ae53954cd8cfa&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/365609177.jpg?k=037734b9040633397ab7ef8fe4cc32884ce765e59fefdda7f49e87db7bd765a9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333481452.jpg?k=19b18ecd34f01f05f01f1e954fd1ef0ff4be07c9b696eec139dabbfd6e6bbde9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/331254870.jpg?k=672f2996ce3c7a9921da2caf38a8a43fabc549302dba6a96e3e849730013dbc1&o=&hp=1",
        ],
        open_time: "13:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "adis-hotels-prime-ibadan",
        location_id: ibadanLocationId,
        Facilities_id: breakfastFacilitiesId,
      },
      {
        name: "OLYMPUS HOTEL & SUITES",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/440354715.webp?k=f5ed663f3faa9c4600e9c5f0fa782939ce20a4e174211a272a34c7131caf566e&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "OLYMPUS HOTEL & SUITES features an outdoor swimming pool, garden, a restaurant and bar in Ibadan. This 5-star hotel offers room service and a 24-hour front desk. The hotel has family rooms.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/square200/440354715.webp?k=f5ed663f3faa9c4600e9c5f0fa782939ce20a4e174211a272a34c7131caf566e&o=&s=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/324608042.jpg?k=dd025fddd74319ac67974b273f8a47b8b644da741e510f4d650b8054d40d2965&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/324608048.jpg?k=39e967c7af3249d96eb2840d84831a608618ee3a4d346d9692d0412a1c340042&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/324608053.jpg?k=6570cf25c13d6f26f09d69498547f912697013577578b9fae604322f9c24a90e&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/324608060.jpg?k=f3b24adca803740c96a03b31994978f6e31aac5a106eac42011f228741b39629&o=&hp=1",
        ],
        open_time: "12:00:00.000Z",
        close_time: "18:00:00.000Z",
        slug: "olympus-hotel-&-suites-ibadan",
        location_id: ibadanLocationId,
       Facilities_id: poolFacilitiesId,
      },
      {
        name: "Eagle Nest",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/436341298.webp?k=4f010cb49c12bd01422b9ba4a812791204ac4c8446f92f20beeb2c5f47cf8451&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Located in Ibadan, 12 km from IITA Forest Reserve, Eagle Nest provides accommodation with a garden, free private parking, a terrace and a restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341450.jpg?k=7b6def7c681b66599ecc90d3803fd8cc2a6e5b39f0350ba452b1a74a42b6d79d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341459.jpg?k=8161cab9d5491353ad9ce0aa5ac01b3bba6cd1aed32d25e21f92a6a5a1239b5c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341464.jpg?k=185eaef872d30c77d86793f919079d232debf9a3d6f47af66507409855ef951e&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341473.jpg?k=a57ccec0471da17ad35c38a7bcc8b4d513c731d57deefcae1a2754781befc82d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341482.jpg?k=6c0e6af8cf762e816a64306c9fc3bd8106fd1ed6cc04712dbe6b5af9d92772ca&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341494.jpg?k=31fe79f600917905bd2ec1c2d3823ed8ccb97b23bb2cfba31ff7ea2f6fe99367&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/436341500.jpg?k=f24740a855abeaea86bc426d0fe2ddcef923092c8870308a4c81fbd56d9a8250&o=&hp=1",
        ],
        open_time: "09:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "eagle-nest-ibadan",
        location_id: ibadanLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "Umbrella properties - Eleyele Ibadan",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/424865016.webp?k=d78d4083409e5b5b50ca5ef60eefa28cf0b9499ceaba19460f6e1413271aac18&o=&s=1",
        price: PRICE.REGULAR,
        description:
          "Located in Ibadan, 17 km from IITA Forest Reserve, Umbrella properties - Eleyele Ibadan provides accommodation with a garden, free private parking, a shared lounge and a terrace.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/424865015.jpg?k=2fa3bc95cd23386bdd36bd8a5df643d4521c2ce1de5bfe33fe8e6af2e22ad6a9&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/424864989.jpg?k=70b27358bf7762ef15850167922024a43278baaafd983728092cfb6274cdc3b0&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/403261662.jpg?k=eb36199a4aaa228409d99ed3c2f864005dbc740bd55431b859addc38b9fa6c60&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/424865001.jpg?k=9fa624f81dad6dd8c0d413473e94eefda1df638917a19f977300bae5b05a9053&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/422474403.jpg?k=dad9e2cc4f4a953d761e66126f912e46aa8a3b5cc067a557e9b1a2da190ab55b&o=&hp=1",
        ],
        open_time: "13:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "umbrella-properties-eleyele-ibadan",
        location_id: ibadanLocationId,
        Facilities_id: wifiFacitiliesId,
      },
      {
        name: "MONDEESTARS LUXURY HOME",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/390899683.webp?k=e2c11551d3ba49863783c2a2d9bc36b13e690758314d73da618c4c66d0e9540c&o=&s=1",
        price: PRICE.EXPENSIVE,
        description:
          "Set in Ibadan, 27 km from IITA Forest Reserve, MONDEESTARS LUXURY HOME offers accommodation with a garden, free private parking, a shared lounge and a terrace.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/390968839.jpg?k=1d716e9f9ca7b1e28cbf89479740e21e8c8c589e45e4043ca68f6c46982c0fe3&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/391046694.jpg?k=73b8225b780c2dd93b17e14449e59eccf0fe302ad45af9777bc24ee1934fc2ad&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/391043670.jpg?k=8dc01a899cd7301f97556d876ec3774357c2f1952382465d6f1d3debe7791c99&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/391047366.jpg?k=9e99325881a9f00eb106722aad3603fe4f67bacfbfad129e75db247f3db9b203&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/391047366.jpg?k=9e99325881a9f00eb106722aad3603fe4f67bacfbfad129e75db247f3db9b203&o=&hp=1",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "mondeestars-luxury-home-ibadan",
        location_id: ibadanLocationId,
        Facilities_id: poolFacilitiesId,
      },
      {
        name: "AYAAKAJE GUEST HOUSE",
        main_image:
          "https://cf.bstatic.com/xdata/images/hotel/square200/328554504.webp?k=dff0241e08642465bc914e8c3f933bd998beb1c2ebe26ed57d6fff05c887e7ae&o=&s=1",
        price: PRICE.CHEAP,
        description:
          "Situated in Ibadan, 14 km from IITA Forest Reserve, AYAAKAJE GUEST HOUSE features accommodation with a shared lounge, free private parking and a restaurant.",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296203019.jpg?k=3ccd620bccd64a9f7223b80ba7a6a81f9924b31c37808f79c47724b958e3b2f7&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/320390289.jpg?k=bb488546c1f31c83f85138742e8fb2a71bf8d9e4ff99ea6bec67dcaa9cfc22c8&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/314731026.jpg?k=b3c85ddd94a9d647731215310422fa4bc2fda759564ea7f4d7e17523b60b5391&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296203029.jpg?k=24ed3850966a07a4f5dc890aed48a5c5294c2c160a56b7c3f7b32316dba2868c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/320390404.jpg?k=f9472d7511262b333e769aeab9dca74672d7ad096ecca8da7fc5c122e969990a&o=&hp=1",
        ],
        open_time: "07:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "ayaakaje-guest-house-ibadan ",
        location_id: ibadanLocationId,
        Facilities_id: wifiFacitiliesId,
      },
    ],
  });

  const hotels = await prisma.hotel.findMany();

  const RadissonId =
    hotels.find((hotel) => hotel.name === "Radisson Blu Anchorage Hotel")
      ?.id || 1;
  const MorningId =
    hotels.find((hotel) => hotel.name === "Morning Side Suites")
      ?.id || 1;
  const LagosId =
    hotels.find((hotel) => hotel.name === "Lagos Marriott Hotel Ikeja")
      ?.id || 1;
  const ExclusiveId =
    hotels.find((hotel) => hotel.name === "Exclusive Upscale 1 Bedroom Apartment in Lekki phase 1")
      ?.id || 1;
  const FourId =
    hotels.find((hotel) => hotel.name === "Four Points by Sheraton Lagos")
      ?.id || 1;
  const NordicId =
    hotels.find((hotel) => hotel.name === "Nordic Hotel Lagos")
      ?.id || 1;
  const GilgalId =
    hotels.find((hotel) => hotel.name === "The GilGal")?.id || 1;
  const VictorialId =
    hotels.find((hotel) => hotel.name === "Victoria Crown Plaza Hotel ")?.id || 1;
  const TranscorpId =
    hotels.find((hotel) => hotel.name === "Transcorp Hilton Abuja")
      ?.id || 1;
  const BestId =
    hotels.find((hotel) => hotel.name === "Best Premier Maitama Residence")?.id ||
    1;
  const DestinationId =
    hotels.find((hotel) => hotel.name === "The Destination by Gidanka")?.id || 1;
  const AveonId =
    hotels.find((hotel) => hotel.name === "Aveon Hotel")?.id || 1;
  const MayFairId =
    hotels.find((hotel) => hotel.name === "MayFair Hotel Wuse2 Abuja")?.id ||
    1;
  const ESuiteId =
    hotels.find((hotel) => hotel.name === "E-suite Hotel")
      ?.id || 1;
  const ResidencyId =
    hotels.find((hotel) => hotel.name === "Residency Hotel Utako Abuja")
      ?.id || 1;
  const TranquilId =
    hotels.find((hotel) => hotel.name === "Tranquil Mews Hotel")?.id || 1;
  const BONId =
    hotels.find((hotel) => hotel.name === "BON Hotel Abuja")?.id || 1;
    const AdisHotelId =
    hotels.find((hotel) => hotel.name === "Adis Hotels Ibadan")?.id || 1;
  const AdisPrimeId =
    hotels.find((hotel) => hotel.name === "Adis Hotels Prime")?.id || 1;
  const OlympusId =
    hotels.find((hotel) => hotel.name === "OLYMPUS HOTEL & SUITES")?.id ||
    1;
  const EagleId =
    hotels.find((hotel) => hotel.name === "Eagle Nest")
      ?.id || 1;
  const UmbrellaId =
    hotels.find((hotel) => hotel.name === "Umbrella properties - Eleyele Ibadan")
      ?.id || 1;
  const MondeestarId =
    hotels.find((hotel) => hotel.name === "MONDEESTARS LUXURY HOME")?.id || 1;
  const AyaakayeId =
    hotels.find((hotel) => hotel.name === "AYAAKAJE GUEST HOUSE")?.id || 1;

  await prisma.items.createMany({
    data: [
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦125,000",
        Hotel_id: RadissonId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦55,000",
        Hotel_id: RadissonId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: RadissonId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: MorningId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: MorningId,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: LagosId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: LagosId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: LagosId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: ExclusiveId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: ExclusiveId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: ExclusiveId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: FourId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: FourId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: FourId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: NordicId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: NordicId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: NordicId ,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: GilgalId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: GilgalId,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: VictorialId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: VictorialId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: VictorialId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: TranscorpId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: TranscorpId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: TranscorpId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: BestId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: BestId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: BestId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: DestinationId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: DestinationId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: DestinationId ,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: AveonId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: AveonId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: MayFairId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: MayFairId,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: ESuiteId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: ESuiteId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: ESuiteId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: ResidencyId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: ResidencyId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: ResidencyId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: TranquilId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: TranquilId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: TranquilId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: BONId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: BONId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: BONId ,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: AdisHotelId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: AdisHotelId,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: AdisPrimeId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: AdisPrimeId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: AdisPrimeId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: OlympusId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: OlympusId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: OlympusId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: EagleId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: EagleId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: EagleId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦70,000",
        Hotel_id: UmbrellaId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦45,000",
        Hotel_id: UmbrellaId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦22,000",
        Hotel_id: UmbrellaId ,
      },
      {
        name: "Presidential Suite",
        description:
          "2 extra-large double bed with free wifi and breakfast",
        price: "₦102,000",
        Hotel_id: MondeestarId,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦65,000",
        Hotel_id: MondeestarId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦30,000",
        Hotel_id: MondeestarId ,
      },
      {
        name: "Executive Room",
        description: "1 extra-large double bed with free wifi ",
        price: "₦25,000",
        Hotel_id: AyaakayeId,
      },
      {
        name: "Deluxe Room",
        description:
          "1 double bed with free wifi",
        price: "₦10,000",
        Hotel_id: AyaakayeId,
      },
      
    ],
  });

    const userOpeyemi = await prisma.user.create({
      data: {
        first_name: "Opeyemi",
        last_name: "Omotayo",
        email: "ope@gmail.com",
        city: "Lagos",
        password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
        phone: "1112223333",
      },
    });

    const userJosh = await prisma.user.create({
      data: {
        first_name: "Josh",
        last_name: "Adeoye",
        email: "josh@gmail.com",
        city: "Abuja",
        password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
        phone: "1112223333",
      },
    });

    const userYemi = await prisma.user.create({
      data: {
        first_name: "Yemi",
        last_name: "James",
        email: "Yemi@gmail.com",
        city: "Ibadan",
        password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
        phone: "1112223333",
      },
    });


    await prisma.review.createMany({
      data: [
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "This place is amazing,everything is perfect. It is so so so good!!!",
          rating: 5,
          Hotel_id: RadissonId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "This place is so good! It is the fanciest place I have ever been in my life",
          rating: 5,
          Hotel_id: LagosId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
        last_name: "James",
          text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
          rating: 5,
          Hotel_id: MorningId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
          rating: 4,
          Hotel_id: ExclusiveId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "The place is okay",
          rating: 2,
          Hotel_id: FourId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
        last_name: "James",
          text: "This place is amazing, it has some of the best services in the world. It is so so so good!!!",
          rating: 5,
          Hotel_id: NordicId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "As always, food was excellent. ",
          rating: 5,
          Hotel_id: GilgalId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "Nice place to go to",
          rating: 3,
          Hotel_id: VictorialId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
        last_name: "James",
          text: "very cozy",
          rating: 4,
          Hotel_id: TranscorpId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "i love the room service",
          rating: 5,
          Hotel_id: BestId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "Had a great time there",
          rating: 3,
          Hotel_id: DestinationId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
          last_name: "James",
          text: "Not bad",
          rating: 3,
          Hotel_id: AveonId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "Wonderful food and service.",
          rating: 5,
          Hotel_id: MayFairId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "Great staff, great room service. ",
          rating: 5,
          Hotel_id: ESuiteId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
          last_name: "James",
          text: "Wonderful service! Delicious food! Comfortable seating and luxurious atmosphere.",
          rating: 5,
          Hotel_id: ResidencyId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "Not bad",
          rating: 4,
          Hotel_id: TranquilId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
          last_name: "Adeoye",
          text: "This visit was with a friend who had never been here before. She loved it as much as I do. She said it will be our new go to place!",
          rating: 4,
          Hotel_id: BONId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
          last_name: "James",
          text: "Great atmosphere",
          rating: 5,
          Hotel_id: AdisHotelId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "Very nice evening spent with special family.",
          rating: 5,
          Hotel_id: AdisPrimeId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
        last_name: "Adeoye",
          text: "First time, and not the last. Very welcoming. The food was deliscious and service very good. Highly recommend.",
          rating: 4,
          Hotel_id: OlympusId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
          last_name: "James",
          text: "Enjoyed our stay there. Great service and ambience.",
          rating: 5,
          Hotel_id: EagleId,
          user_id: userYemi.id,
        },
        {
          first_name: "Opeyemi",
        last_name: "Omotayo",
          text: "We had such a great experience and our server was top notch. ",
          rating: 4,
          Hotel_id: UmbrellaId,
          user_id: userOpeyemi.id,
        },
        {
          first_name: "Josh",
        last_name: "Adeoye",
          text: "Not bad.The atmosphere is great",
          rating: 5,
          Hotel_id: MondeestarId,
          user_id: userJosh.id,
        },
        {
          first_name: "Yemi",
          last_name: "James",
          text: "Good good good!",
          rating: 4,
          Hotel_id: AyaakayeId,
          user_id: userYemi.id,
        },
      ],
    });

  //   await prisma.table.createMany({
  //     data: [
  //       {
  //         restaurant_id: vivaanId,
  //         seats: 4,
  //       },
  //       {
  //         restaurant_id: vivaanId,
  //         seats: 4,
  //       },
  //       {
  //         restaurant_id: vivaanId,
  //         seats: 2,
  //       },
  //     ],
  //   });

  res.status(200).json({ name: "hello" });
}
