import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score, precision_score
import joblib

# Load and preprocess the data
parkinsons_data = pd.read_csv('parkinsons.csv')
X = parkinsons_data.drop(columns=['name', 'status'], axis=1)
Y = parkinsons_data['status']

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=2)
standard = StandardScaler()
standard.fit(X_train)
X_train = standard.transform(X_train)
X_test = standard.transform(X_test)

# Train the model
abc = AdaBoostClassifier(n_estimators=50, random_state=2)
abc.fit(X_train, y_train)

# Evaluate the model
y_pred = abc.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Precision: {precision_score(y_test, y_pred)}")

# Save the trained model and scaler
joblib.dump(abc, 'parkinsons_model.pkl')
joblib.dump(standard, 'scaler.pkl')

# Example of making predictions
input_data_reshaped = X_test[0].reshape(1, -1)
std_data = standard.transform(input_data_reshaped)
prediction = abc.predict(std_data)

if prediction[0] == 0:
    print("The Person does not have Parkinson's Disease")
else:
    print("The Person has Parkinson's Disease")
