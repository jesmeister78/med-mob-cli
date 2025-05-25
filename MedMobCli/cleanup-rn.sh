#!/bin/bash

echo "🧹 Starting React Native project cleanup..."

# Kill existing processes
echo "👮 Killing existing Node processes..."
killall node 2>/dev/null || true
killall "React Native Debugger" 2>/dev/null || true  # Kill existing RN Debugger
lsof -ti :8081 | xargs kill -9 2>/dev/null || true  # Kill any process using Metro's port

# Clean Metro bundler cache
echo "🧼 Cleaning Metro cache..."
rm -rf $TMPDIR/react-* 2>/dev/null || true
rm -rf $TMPDIR/metro-* 2>/dev/null || true
rm -rf $TMPDIR/haste-* 2>/dev/null || true
watchman watch-del-all 2>/dev/null || true

# Clean and update node_modules cache
echo "📦 Cleaning and updating node_modules cache..."
# rm -rf node_modules/.cache
# rm -rf ~/.rncache /* 2>/dev/null || true  # Clear RN cache directory

# Clean and update node_modules
echo "📦 Cleaning and updating node_modules..."
rm -rf node_modules
rm -f package-lock.json
echo " • Installing latest compatible packages..."
npm install

# Clean iOS
echo "🍎 Cleaning iOS build..."
cd ios
# Clear pod cache
echo "• Clear pod cache..."
pod cache clean --all
pod repo update
echo " • Removing Pods..."
rm -rf Pods
echo " • Removing build folder..."
rm -rf build
echo " • Cleaning Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData
echo " • Running pod deintegrate..."
pod deintegrate
echo " • Removing Podfile.lock..."
rm -f Podfile.lock
echo " • Installing pods..."
pod install
cd ..

# Launch React Native Debugger
# echo "🐛 Launching React Native Debugger..."
# # Only launch if the app exists
# if [ -d "/Applications/React Native Debugger.app" ]; then
#     open -a "React Native Debugger"
# else
#     echo "⚠️ React Native Debugger not found. Please install it first."
# fi

echo "✅ Cleanup complete!"

# Optional: remind user about next steps
echo "
👉 Next steps:
   • To start Metro: npm start -- --reset-cache
   • To run iOS: npx react-native run-ios
   • To run Android: npx react-native run-android"