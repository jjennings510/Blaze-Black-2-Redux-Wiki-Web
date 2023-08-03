import { GAME_VERSION } from "../../constants";
import { Search } from "../NavbarAndFooter/components/Search";
import { CreditsCard } from "./components/CreditsCard";

export const HomePage = () => {
  const gameVersion = GAME_VERSION;

  return (
    <div>
      <div className="container text-center my-5">
        <h1 className="display-4">
          Pokemon Blaze Black 2 Redux
          <small className="display-6"> {gameVersion}</small>
        </h1>
        <div className="image-container d-flex justify-content-center align-items-center">
          <img src={require("../Images/BlazeBlack2Redux.png")}></img>
        </div>
      </div>
      <CreditsCard />
      <div className="container">
        <h4 className="mt-3">Summary</h4>
        <p>
          This REDUX Project Is An More Enhanced Edition Of Original Blaze Black
          2!
        </p>
        <p>
          Pokémon Blaze Black 2 & Pokémon Volt White 2 are essentially the
          sequels to my Black & White hacks known as Blaze Black and Volt White.
          The usual rules with my hacks apply; the main feature is that all 649
          Pokémon are available for capture somewhere in the game, and the
          trainers have all had their rosters changed in order to maintain a
          much harder challenge than the original game, as well as having an
          increased variety of opponents to fight. There's also a large amount
          of alternative features these hacks offer, which range from
          differences to the Pokémon themselves to the presence of a couple new
          TMs. If I'm not mistaken, these are also the first Black 2 and White 2
          hacks on offer.
        </p>
        <p>
          Additionally, the two versions only differ in terms of their aesthetic
          differences, such as the appearance of Opelucid City, the title
          screen, etcetera. So basically, just pick whichever colour takes your
          fancy!
        </p>
        <h4 className="mt-3">Special Features</h4>
        <ul>
          <li>The ability to catch all 649 Pokémon in a single playthrough.</li>
          <li>
            A revamped trainer roster and two optional difficulty modes.
            Challenge Mode will push vertain players to their limits, whilst
            Easy Mode provides a relaxed experience. Normal Mode is roughly as
            tough as Renegade Platinum.
          </li>
          <li>
            The addition of the Fairy Type, as well as changes to the Steel type
            introduced In Gen VI.
          </li>
          <li>
            Documentation of all Pokémon changes, Item locations, important NPCs
            etc - as is standard in Drayano Hacks.
          </li>
          <li>
            Select moves from later generations have been implemented, replacing
            old and broadly unused moves. This includes (and is not limited too)
            Power-Up Punch taking the place of Comet Punch, Dual Wingbeat the
            place of Vice Grip and Lunge the place of Barrage. Furthermore,
            several Legends: Arceus moves and move changes have been included!
          </li>
          <li>
            A new level curve. All Pokémon can be fully evolved by the Pokémon
            League.
          </li>
          <li>
            Several brand new story additions and character encounters. For
            example, instead of heading to Pokéstar Studios, you'll now remind
            Brycen of the joy of Pokémon battles!
          </li>
          <li>
            All legendary encounters have been revamped and extended. You'll
            travel to a new Faraway Island to catch Mew, meet Morty hunting down
            Suicune or travel to the Entralink to catch Celebi.
          </li>
          <li>
            The Postgame has been expanded, now including ~2-3 hours of
            additional content in a questline surrounding Unity Tower, a
            returning fan favourite character and the very fate of the universe.
            This will serve as the way to catch Dialga, Palkia, Giratina and
            Arceus in Redux.
          </li>
          <li>
            Pokémon across the Pokédex have been updated to their modern stat
            distributions, held items, type combinations and abilities.
            <ul>
              <li>
                Furthermore, Pokémon have had their dream world abilities (were
                useful) swapped into their regular abilities, so that they can
                be obtained via regular gameplay.
              </li>
            </ul>
          </li>
          <li>
            In the complete version of Redux, Pokémon have received additional
            changes to abilities, moveset and type combinations. For example,
            Serperior is now Grass/Dragon, Weavile gets Technician and
            Butterfree has a higher BST. If this kind of thing isn't for you, a
            Classic Patch is available which omits these changes.
          </li>
          <li>
            The need for trade evolution has been removed. Pokémon which used to
            evolve by trade now evolve by using the new 'Link Cable' item on
            them like an evolutionary stone. (Which actually predates Legends:
            Arceus!). In addition, all Pokémon which previously evolved by
            holding an item whilst being traded can now have said item used upon
            them like an evolutionary stone. For other types of trade evolution,
            the new method to evolve is listed in the provided documents.
          </li>
          <li>
            All Pokémon have seen their level-up learnsets completely revamped
            to include Egg moves, Event moves and in select cases, moves they
            couldn't learn before. These changes include learnset changes up to
            and including Gen VIII, where appropriate. There are also some
            Legends: Arceus additions!
          </li>
          <li>
            A number of moves have received balance adjustments, including
            changes made in official games since Gen V. There have also been
            some custom changes, like those seen in Drayano's previous hacks.
          </li>
          <li>
            Item distribution has been completely overhauled. You'll have access
            to the Muscle Band before the first gym and all TMs by the Pokémon
            league. Powerful items like Leftovers have been restricted though,
            you'll have to work a little harder to obtain them than in the
            Vanilla titles ;).
          </li>
          <li>
            The ability to revive Fossils has been brought forward from Narcene
            City to the Desert Resort. Select NPCs will now gift you Fossils,
            whilst the rest can be found in the Overworld.
          </li>
          <li>
            Clay Tunnel has been opened early, no longer requiring the player to
            have beaten the Pokémon League to access.
          </li>
          <li>
            Clay Tunnel has been opened early, no longer requiring the player to
            have beaten the Pokémon League to access.
          </li>
          <li>
            The selection of Gift Pokémon has been overhauled. Gone are the
            season dependent starter gifts from BB2 and VW2, in their place are
            new NPCs who give you a choice of starter. There are also a couple
            of new NPC gifts, including an Egg with Random contents, an
            Elemental Monkey (like in Black and White) and a special Corsola!
          </li>
          <li>
            Marts and Vendors have seen their inventory overhauled, it is now
            possible to buy Evolutionary Stones in Driftveil market and EV
            reducing berries in Castelia City. Speaking of...
          </li>
          <li>
            Returning from Platinum is the inclusion of a dedicated EV trainer
            and Pokémon leveling trainer. These additions are sure to help with
            team building and reducing the time spent Audino Grinding.
          </li>
          <li>
            Indeed, Audino grinding has been made more convenient and there are
            new nurses to help with grinding in Castelia Gardens and Victory
            Road. Furthermore, Audino grinding is now possible before the first
            Gym via NPC!
          </li>
          <li>
            The amount of required HMs has been cut back, no longer shall you
            find Cut trees blocking your way. Furthermore, the need to use Flash
            has been eliminated from dark caves.
          </li>
          <li>
            The Shiny rate has been increased to 1/512, like in Renegade
            Platinum.
          </li>
          <li>
            NPC trades have been fixed and overhauled to give more useful
            Pokémon than before.
          </li>
          <li>
            Attempting to fish in a body of water should no longer fail.
            Instead, the player should be guaranteed an encounter with each cast
            of the rod!
          </li>
          <li>
            The Medal Guy has been moved to the upper levels of the Pokémon
            Center. This should stop the player accidentally talking to him for
            5+ minutes when they just want to use the PC!
          </li>
        </ul>
        <p>
          Some good news surrounding the Fairy Type implementation and playing
          the game on Flash Cards, Twilight Menu etc.
        </p>
        <ul>
          <li>
            It seems as if Redux does indeed work on several different setups, I
            will include a Document which keeps track of what users report as
            working or not. This includes TWiLight Menu ++.
          </li>
          <li>
            An emulator is still recommended, but with the info above in mind,
            there's a good chance it can be enjoyed on other setups :)
          </li>
          <li>
            If a new implementation becomes available, I will work to include it
            in Redux ASAP - the game will not be left behind!
          </li>
        </ul>
        <h4 className="mt-3">Credits</h4>
        <ul>
          <li>
            Kaphotics: I cannot stress how helpful Kaph has been in the creation
            of this hack; he's been great as both an advisor and a researcher
            into the workings of scripts in the game. He also taught me a little
            about RAM editing, which made testing some things that much easier.
            His LUA scripting abilities were also great for figuring out file
            numbers and co-ordinates! Truly a saviour.
          </li>
          <li>
            likeicareusewe/kidisnice87: Another very helpful contributor to the
            hack, he along with one other person worked as my helpers for BETA
            testing. Thanks to him, a lot of the bugs that would have otherwise
            gone unnoticed were ironed out before release. A huge thank you!
          </li>
          <li>
            Lazerith: My other beta tester, who is also a Pokémon hacker himself
            (Pokémon Origin Platinum is his work). Again, thank you.
          </li>
          <li>
            pichu2001: The scripting knowledge he posted over at Project
            Pokémon's forums was exactly what I needed to start messing around
            with scripts. It's thanks to him and Kaph that I was able to get
            things like the legends working correctly.
          </li>
          <li>
            Pokegirl4ever: The Genesect overworld sprite used in the game is her
            work.
          </li>
          <li>knivez69: The logos at the top were made by him.</li>
        </ul>
        <p>
          They're the main people who helped with this one, but my thanks goes
          out to any supporters and the people who've helped me out and
          suggested ideas along the way!
        </p>
      </div>
    </div>
  );
};
