
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  editItem,
  deleteItem,
  toggleBought,
  clearBought,
} from "../features/shopping/shoppingSlice";

function ShoppingListPage() {
  const dispatch = useDispatch();

  // Get shopping items from Redux
  const items = useSelector((state) => state.shopping.items);

  // Form values
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("Other");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Shopping summary
  const bought = items.filter((item) => item.bought).length;
  const remaining = items.length - bought;

  // Add or update an item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter an item name.");
      return;
    }

    if (!quantity.trim() || Number(quantity) <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    setError("");

    if (editingId) {
      dispatch(
        editItem({
          id: editingId,
          name: name.trim(),
          quantity,
          category,
          bought: false,
        })
      );

      setEditingId(null);
    } else {
      dispatch(
        addItem({
          id: crypto.randomUUID(),
          name: name.trim(),
          quantity,
          category,
          bought: false,
        })
      );
    }

    // Clear form
    setName("");
    setQuantity("1");
    setCategory("Other");
  };

  // Edit an item
  const handleEdit = (item) => {
    setName(item.name);
    setQuantity(item.quantity);
    setCategory(item.category);
    setEditingId(item.id);
    setError("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setName("");
    setQuantity("1");
    setCategory("Other");
    setEditingId(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">

      <div className="mx-auto max-w-4xl">

        {/* Page heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            My Shopping List
          </h1>

          <p className="mt-2 text-green-700">
            Organize your ingredients before cooking.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-3 gap-3">

          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-2xl font-bold text-green-800">
              {items.length}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-500">Remaining</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {remaining}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-500">Bought</p>
            <h2 className="text-2xl font-bold text-green-600">
              {bought}
            </h2>
          </div>

        </div>

        {/* Shopping form */}
        <div className="mb-6 rounded-lg bg-white p-5 shadow">

          <h2 className="mb-4 text-xl font-bold text-green-800">
            {editingId ? "Edit Item" : "Add Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <div>
              <label className="mb-1 block text-gray-700">
                Item Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tomatoes"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="mb-1 block text-gray-700">
                  Quantity
                </label>

                <input
                  type="number"
                  min="0.01"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border p-3"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Meat">Meat</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Grains">Grains</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex gap-2">

              <button
                type="submit"
                className="rounded-lg bg-green-700 p-3 text-white hover:bg-green-800"
              >
                {editingId ? "Update Item" : "Add Item"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg bg-gray-200 p-3"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* Shopping items */}
        <div className="rounded-lg bg-white p-5 shadow">

          <div className="mb-4 flex justify-between gap-2">
            <h2 className="text-xl font-bold text-green-800">
              Shopping Items
            </h2>

            {bought > 0 && (
              <button
                onClick={() => dispatch(clearBought())}
                className="text-sm text-red-600"
              >
                Clear Bought
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              Your shopping list is empty. Add your first item!
            </p>
          ) : (
            <div className="space-y-3">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={item.bought}
                      onChange={() => dispatch(toggleBought(item.id))}
                      className="h-5 w-5 accent-green-700"
                    />

                    <div>
                      <h3
                        className={
                          item.bought
                            ? "text-gray-400 line-through"
                            : "font-bold text-green-800"
                        }
                      >
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} | {item.category}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => handleEdit(item)}
                      className="text-green-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ShoppingListPage;
