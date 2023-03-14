import React, {useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image } from "react-native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { JournalSubInfo, TaggedItems, Title } from "./JournalSubInfo";
import { RectButton, CircleButton } from "./Button";
import {db} from "../firebase";
import { collection, getDocs} from "firebase/firestore";

const JournalCard = () => {
  const navigation = useNavigation();
  const [journals,setjournals] = useState([]);

  useEffect(() => {
    const fetchjournals = async () => {
      const querySnapshot = await getDocs(collection(db, "journals"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setjournals(data);
    };
    fetchjournals();
  }, []);

  return (
    <>
      {journals.map((journal) => (
        <View
          key={journal.id}
          style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 80,
            }}
          >
            <Image
              source={journal.image}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: SIZES.font,
                borderTopRightRadius: SIZES.font,
              }}
            />

            {/* <CircleButton
              imgUrl={assets.heart}
              right={10}
              top={10}
              handlePress={() =>
                navigation.navigate("Details", { journalId: journal.id })
              }
            /> */}
          </View>

          <JournalSubInfo date={journal.date} location={journal.location} />

          <View style={{ width: "100%", padding: SIZES.font }}>
            <Title
              title={journal.journalEntry}
              titleSize={SIZES.large}
              subTitleSize={SIZES.small}
            />

            <View
              style={{
                marginTop: SIZES.font,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TaggedItems tags={journal.tags} />
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default JournalCard;