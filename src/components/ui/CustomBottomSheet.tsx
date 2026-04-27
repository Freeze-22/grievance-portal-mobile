import React, { forwardRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

interface CustomBottomSheetProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  title?: string;
}

export const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ options, onSelect, title = "Select Option" }, ref) => {
    // variables
    const snapPoints = useMemo(() => ['50%', '75%'], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt.value} 
              style={styles.optionBtn}
              onPress={() => onSelect(opt.value)}
            >
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

// Fallback styling because bottom-sheet sometimes has issues with nativewind in portals
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 24,
  },
  indicator: {
    backgroundColor: '#475569', // slate-600
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#f8fafc', // slate-50
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  optionBtn: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155', // slate-700
  },
  optionText: {
    color: '#e2e8f0', // slate-200
    fontSize: 16,
    fontWeight: '500',
  }
});
