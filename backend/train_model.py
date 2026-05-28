import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from imblearn.over_sampling import SMOTE
import joblib, os

# 1. Load data
df = pd.read_csv('../data/student_depression.csv')
print("Rows loaded:", len(df))
print("Columns:", df.columns.tolist())

# 2. Drop rows with missing values
df = df.dropna()

# 3. Encode text columns to numbers
le = LabelEncoder()
for col in df.select_dtypes(include='object').columns:
    df[col] = le.fit_transform(df[col].astype(str))

# 4. Separate features (X) and label (y)
target_col = 'Depression'   # change if your CSV uses different name
X = df.drop(columns=[target_col])
y = df[target_col]

# 5. Scale numbers between 0 and 1
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
feature_names = X.columns.tolist()

# 6. Split: 75% train, 25% test
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.25, random_state=42, stratify=y)

# 7. Fix class imbalance with SMOTE
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X_train, y_train)
print("After SMOTE — training samples:", len(X_res))

# 8. Train Random Forest
rf = RandomForestClassifier(
    n_estimators=200, max_depth=12,
    min_samples_split=10, min_samples_leaf=5,
    class_weight='balanced', random_state=42)
rf.fit(X_res, y_res)

# 9. Evaluate
from sklearn.metrics import accuracy_score, classification_report
y_pred = rf.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test, y_pred) * 100, 2), "%")
print(classification_report(y_test, y_pred))

# 10. Save the model and scaler
os.makedirs('model', exist_ok=True)
joblib.dump(rf, 'model/depression_model.pkl')
joblib.dump(scaler, 'model/scaler.pkl')
joblib.dump(feature_names, 'model/feature_names.pkl')
print("Model saved to backend/model/")