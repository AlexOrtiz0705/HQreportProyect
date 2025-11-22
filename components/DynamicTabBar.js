import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

// Ajusta estos valores si cambias estilos de flechas
const ARROW_WIDTH = 40; // ancho visual de cada flecha
const H_PADDING_SCROLL = 10; // padding horizontal del contenedor de scroll

export default function DynamicTabBar({ tabs = [], activeTab, onTabPress }) {
  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  const hasArrows = tabs.length >= 3;

  // Ancho disponible entre flechas
  const availableWidth = hasArrows
    ? screenWidth - (ARROW_WIDTH * 2) - (H_PADDING_SCROLL * 2)
    : screenWidth;

  // Queremos EXACTAMENTE 2 tabs visibles entre flechas cuando hay 3+
  const tabWidth =
    tabs.length >= 3
      ? availableWidth / 2
      : Math.max(availableWidth / Math.max(tabs.length, 1), 100);

  return (
    <View style={styles.tabBarContainer}>
      {hasArrows && (
        <TouchableOpacity
          style={[styles.arrow, styles.arrowLeft]}
          onPress={() => scrollBy(-availableWidth / 2)}
        >
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.scrollWrapper, { width: hasArrows ? availableWidth : availableWidth }]}>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: H_PADDING_SCROLL }]}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.value;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabButton,
                  { width: tabWidth },
                  isActive && styles.activeTab,
                ]}
                onPress={() => onTabPress(tab.value)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {hasArrows && (
        <TouchableOpacity
          style={[styles.arrow, styles.arrowRight]}
          onPress={() => scrollBy(availableWidth / 2)}
        >
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  scrollWrapper: {
    // Este wrapper reserva el ancho exacto entre flechas
  },
  scrollContent: {
    flexDirection: "row",
  },
  tabButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    borderColor: "#000",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  activeTab: {
    backgroundColor: "#ff6600",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
  arrow: {
    width: ARROW_WIDTH,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  arrowLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  arrowRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
});